import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { TitleCasePipe } from '@angular/common';
import { IUser } from '../interfaces/User';
import { IProject } from '../interfaces/Project';
import { ProjectService } from '../project.service';
import { FilterProjectPipe } from '../filter-project.pipe';

declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [[UserService, ProjectService, TitleCasePipe, FilterProjectPipe]]
})

export class AddProjectComponent implements OnInit {

  addProjectForm: FormGroup;
  today: Date;
  tomorrow: Date;
  projects: IProject[];
  filteredProjects: IProject[];
  usersList: IUser[];
  searchText: string;
  searchUser: string;
  selectedUser: string;
  selectedUserId: string;
  editable: boolean;
  editId: string;
  error: string;
  tempProject: IProject;
  addProject: IProject;
  editProject: IProject;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private titleCasePipe: TitleCasePipe,
              private filterProjectPipe: FilterProjectPipe
              ) { }

  ngOnInit() {
    this.setDefaultDate();
    this.createForm();
    this.userService.getusers().subscribe(data => {
      this.usersList = data;
    }, error => {
      console.log(error);
    });
    this.listProjects();
  }

  dateFormatter(date: Date, format: string): any {
    if (!date) { return null; }
    return new DatePipe('en-US').transform(date, format);
  }

  setDefaultDate() {
    const date1 = new Date();
    const date2 = new Date(date1.setDate(date1.getDate() + 1));
    this.today = this.dateFormatter(new Date(), 'yyyy-MM-dd');
    this.tomorrow = this.dateFormatter(date2, 'yyyy-MM-dd');
    if (this.addProjectForm) {
      let start, end;
      start = this.addProjectForm.get('startDate').value;
      end = this.addProjectForm.get('endDate').value;
      if (!start || !end) {
        this.addProjectForm.patchValue({
          startDate: this.today,
          endDate: this.tomorrow
        });
      }
    }
  }

  createForm() {
    this.addProjectForm = this.fb.group({
      project: [null, Validators.required],
      priority: [0, Validators.required],
      setDate: false,
      startDate: [{ value: this.today, disabled: true }, [Validators.required]],
      endDate: [{ value: this.tomorrow, disabled: true }, [Validators.required]],
      manager: [{ value: null, disabled: true }, Validators.required]
    }, { validator: this.DateValidator() });
  }

  resetForm() {
    this.addProjectForm.reset({
      priority: 0,
      startDate: { value: this.today, disabled: true },
      endDate: { value: this.tomorrow, disabled: true },
      setDate: false
    });
    this.selectedUser = null;
    this.searchUser = null;
    this.selectedUserId = null;
  }

  onSelect(event) {
    const status = event.target.checked;
    console.log(status);
    if (status) {
      this.addProjectForm.get('startDate').enable();
      this.addProjectForm.get('endDate').enable();
    } else {
      this.setDefaultDate();
      this.addProjectForm.get('startDate').disable();
      this.addProjectForm.get('endDate').disable();
    }
  }

  DateValidator() {
    return (group: FormGroup): { [key: string]: any } => {
      const startDate = new Date(group.controls.startDate.value);
      const endDate = new Date(group.controls.endDate.value);
      const today = new Date(new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'));
      if ((endDate.getTime() < startDate.getTime()) || (startDate.getTime() < today.getTime())) {
        return {
          dates: 'Start/End date is incorrect'
        };
      }
      return {};
    };
  }

  onAdd() {
    console.log(this.addProjectForm.value);
    this.addProject = this.addProjectForm.value;
    console.log('printing the project to be added build ' + this.addProject);
    console.log(this.addProject);
    this.projectService.addProject(this.addProject).subscribe(data => {
      this.resetForm();
      this.listProjects();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error);
    });
  }

  saveUser() {
    const temp = this.selectedUser.split('-');
    this.selectedUserId = temp[0].trim();
    this.addProjectForm.patchValue({
      manager: temp[1].trim()
    });
    $('#UserModal').modal('hide');
  }

  listProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.projects.forEach(project => {
        this.projectService.getTotalTasks(project.projectId).subscribe(result => {
          if (result) {
            project.tasks = result;
          } else {
            project.tasks = 0;
          }
        });
        this.projectService.getCompletedTasks(project.projectId).subscribe(result => {
          if (result) {
            project.completed = result;
          } else {
            project.completed = 0;
          }
        });
      });
      this.filteredProjects = this.projects;
    }, error => {
      console.log(error);
    });

  }

  clearFilter() {
    this.listProjects();
    this.searchText = null;
  }

  sort(basis) {
    console.log('sorting...........................');
    if (basis === 'startDate') {
      this.filteredProjects.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } else if (basis === 'endDate') {
      this.filteredProjects.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    } else if (basis === 'Priority') {
      this.filteredProjects.sort((a, b) => +a.priority - +b.priority);
    } else if (basis === 'Completed') {
      this.filteredProjects.sort((a, b) => +a.completed - +b.completed);
    }
  }

  cancelEdit() {
    this.resetForm();
    this.editable = false;
    this.editId = null;
    this.error = null;
  }

  onEdit(projectId) {
    this.projectService.getProject(projectId).subscribe(result => {
      this.getManager(result[0].userId);
      this.addProjectForm.patchValue({
        project: result[0].project,
        startDate: this.dateFormatter(new Date(result[0].startDate), 'yyyy-MM-dd'),
        endDate: this.dateFormatter(new Date(result[0].endDate), 'yyyy-MM-dd'),
        priority: result[0].priority,
        setDate: false,
      });
      this.editable = true;
      this.editId = projectId;
    }, error => {
      console.log(error);
    });
  }

  getManager(user_id) {
    this.userService.getuser(user_id).subscribe(data => {
      this.selectedUser = data.projectId + ' - ' + data.firstName + ' ' + data.lastName;
      this.addProjectForm.patchValue({
        manager: this.titleCasePipe.transform(this.selectedUser.split('-')[1].trim())
      });
    }, error => {
      console.log(error);
    });
  }

  onEditSave() {
    // project.project = this.titleCasePipe.transform(this.addProjectForm.get('project').value);
    // project.startDate = this.addProjectForm.get('startDate').value;
    // project.endDate = this.addProjectForm.get('endDate').value;
    // project.priority = this.addProjectForm.get('priority').value;
    // project.userId = this.selectedUser.split('-')[0].trim();
    this.editProject = this.addProjectForm.value;
    this.editProject.userId = this.selectedUser.split('-')[0].trim();
    this.editProject.projectId = this.editId;
    this.projectService.updateProject(this.editProject, this.editId).subscribe(data => {
      this.editable = false;
      this.editId = null;
      this.resetForm();
      this.listProjects();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error);
    });
  }

  suspendProject(id) {
    this.projectService.deleteProject(id).subscribe(data => {
      this.listProjects();
    }, error => {
      console.log(error);
    });
  }

  onSearch(text) {
    this.filteredProjects = this.filterProjectPipe.transform(this.projects, text);
  }

}
