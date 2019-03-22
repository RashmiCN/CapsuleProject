import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { IProject } from '../interfaces/Project';
import { IParentTask, ITask } from '../interfaces/Task';
import { IUser } from '../interfaces/User';

declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [UserService, ProjectService, TaskService, TitleCasePipe]
})
export class AddTaskComponent implements OnInit {

  wstaskId: string;
  addTaskForm: FormGroup;
  today: Date;
  tomorrow: Date;
  projects: IProject[];
  usersList: IUser[];
  parentsList: IParentTask[];
  searchProject: string;
  selectedProject: string;
  searchParent: string;
  selectedParent: string;
  searchUser: string;
  selectedUser: string;
  error: string;
  editable = false;
  addTask: ITask;
  editTask: ITask;
  addParent: IParentTask;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private titleCasePipe: TitleCasePipe,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      console.log(this.projects);
    }, error => {
      console.log(error)
    })
    this.userService.getusers().subscribe(data => {
      this.usersList = data;
    }, error => {
      console.log(error);
    });
    this.setDefaultDate()
    this.createForm();

    this.wstaskId = this.route.snapshot.queryParamMap.get('taskId');
    if (this.wstaskId) {
      this.editable = true;
      this.taskService.getTask(this.wstaskId).subscribe(data => {
        console.log(data)
        // TO DO
        this.addTaskForm.patchValue({
          task: data[0].task,
          priority: data[0].priority,
          ifParent: false,
          parentTask: data[0].parentTaskId ? data[0].parentTaskId['parentTask'] : null,
          startDate: this.dateFormatter(new Date(data[0].startDate), 'yyyy-MM-dd'),
          endDate: this.dateFormatter(new Date(data[0].endDate), 'yyyy-MM-dd'),
        })
        this.projectService.getProject(data[0].projectId).subscribe(result => {
          this.addTaskForm.patchValue({
            project: result[0].project
          })
          this.selectedProject = result[0]._id + '-' + result[0].project
          console.log("comehere for modal11111111111111111");
          this.getParentTasks(result[0]._id);
        })
        this.userService.getuser(data[0].userId).subscribe(res => {
          this.addTaskForm.patchValue({
            user: res[0].firstName + ' ' + res[0].lastName
          })
          this.selectedUser = res[0]._id + '-' + res[0].firstName + ' ' + res[0].lastName
        })
        this.addTaskForm.get('ifParent').disable();
        this.selectedParent = data[0].parentTaskId ? data[0].parentTaskId['_id'] + '-' + data[0].parentTaskId['parentTask'] : null
      })
    }
  }

  setDefaultDate() {
    let date1 = new Date();
    let date2 = new Date(date1.setDate(date1.getDate() + 1));
    this.today = this.dateFormatter(new Date(), 'yyyy-MM-dd');
    this.tomorrow = this.dateFormatter(date2, 'yyyy-MM-dd');
  }

  dateFormatter(date: Date, format: string): any {
    if (!date) { return null; }
    return new DatePipe("en-US").transform(date, format);
  }

  createForm() {
    this.addTaskForm = this.fb.group({
      project: [{ value: null, disabled: true }, Validators.required],
      task: [null, Validators.required],
      ifParent: false,
      priority: [0, Validators.required],
      parentTask: [{ value: null, disabled: true }],
      startDate: [this.today, Validators.required],
      endDate: [this.tomorrow, Validators.required],
      user: [{ value: null, disabled: true }, Validators.required]
    }, { validator: this.DateValidator() });
  }

  resetForm() {
    this.error = null;
    this.searchProject = null;
    this.selectedProject = null;
    this.searchParent = null;
    this.selectedParent = null;
    this.searchUser = null;
    this.selectedUser = null;
    this.editable = false;
    this.addTaskForm.reset({
      priority: 0,
      ifParent: false,
      startDate: this.today,
      endDate: this.tomorrow
    });
    this.addTaskForm.get('priority').enable();
    this.addTaskForm.get('startDate').enable();
    this.addTaskForm.get('endDate').enable();
    this.addTaskForm.get('ifParent').enable();
  }

  DateValidator() {
    return (group: FormGroup): { [key: string]: any } => {
      let startDate = new Date(group.controls["startDate"].value);
      let endDate = new Date(group.controls["endDate"].value);
      let today = new Date(new DatePipe("en-US").transform(new Date(), 'yyyy-MM-dd'));
      if ((endDate.getTime() < startDate.getTime()) || (startDate.getTime() < today.getTime())) {
        return {
          dates: "Start/End date is incorrect"
        };
      }
      return {};
    }
  }

  saveProject() {
    this.clearParent();
    let temp = this.selectedProject.split('-')
    console.log(temp);
    this.addTaskForm.patchValue({
      'project': temp[1].trim()
    });
    this.getParentTasks(temp[0]);
    console.log('this is the task id' + temp[0]);
  }

  getParentTasks(id) {
    this.taskService.getParents(id).subscribe(data => {
      this.parentsList = data;
      console.log(this.parentsList);
      this.parentsList = this.parentsList.filter(parent =>
        parent.parentId === id
        
      );
    console.log(this.parentsList);
      $('#ProjectModal').modal('hide');
    }, error => {
      console.log(error)
    })
  }

  saveParent() {
    let temp = this.selectedParent.split('-')
    this.addTaskForm.patchValue({
      "parentTask": temp[1].trim()
    });
    $('#ParentModal').modal('hide');
  }

  saveUser() {
    let temp = this.selectedUser.split('-')
    this.addTaskForm.patchValue({
      "user": temp[1].trim()
    });
    $('#UserModal').modal('hide');
  }

  formStatusValid() {
    if (this.addTaskForm.get('ifParent').value == 'true') {
      return !this.addTaskForm.valid || this.addTaskForm.get('project').value
    } else {
      console.log('here', !this.addTaskForm.valid ||
        !this.addTaskForm.get('project').value || this.addTaskForm.get('parentTask').value ||
        !this.addTaskForm.get('user').value)
      return !this.addTaskForm.valid ||
        !this.addTaskForm.get('project').value || this.addTaskForm.get('parentTask').value ||
        !this.addTaskForm.get('user').value
    }
  }

  onAdd() {
    if (this.addTaskForm.get('ifParent').value) {
      console.log('Parent task');
      this.addParent.parentId = parseInt(this.selectedProject.split('-')[0].trim(), 11);
      this.addParent.parenttaskName = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
      this.taskService.addParent(this.addParent).subscribe(data => {
        this.resetForm();
        this.error = null;
      }, error => {
        this.error = 'Atleast one of the field has error !!';
        console.log(error)
      })
    } else {
      console.log('Child task')
      // var subTask = new Task();
      this.addTask = this.addTaskForm.value;
      this.addTask.projectId = parseInt(this.selectedProject.split('-')[0].trim(), 11);
      this.addTask.userId = parseInt(this.selectedUser.split('-')[0].trim(), 11);
      this.addTask.parentId = parseInt(this.selectedParent ? this.selectedParent.split('-')[0].trim() : null, 11);
      // subTask.priority = this.addTaskForm.get('priority').value;
      // subTask.startDate = this.addTaskForm.get('startDate').value;
      // subTask.endDate = this.addTaskForm.get('endDate').value;
      // subTask.task = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
      this.taskService.addTask(this.addTask).subscribe(data => {
        this.resetForm();
        this.error = null;
      }, error => {
        this.error = 'Atleast one of the field has error !!';
        console.log(error);
      });
    }
  }

  onSelect(event) {
    if (event.target.checked) {
      this.addTaskForm.get('priority').disable();
      this.addTaskForm.get('startDate').disable();
      this.addTaskForm.get('endDate').disable();
    } else {
      this.addTaskForm.get('priority').enable();
      this.addTaskForm.get('startDate').enable();
      this.addTaskForm.get('endDate').enable();
    }
  }

  updateTask() {
    this.editTask = this.addTaskForm.value;

    this.editTask.parentId = parseInt(this.selectedParent ? this.selectedParent.split('-')[0].trim() : null, 11);
    // subTask.priority = this.addTaskForm.get('priority').value;
    // subTask.startDate = this.addTaskForm.get('startDate').value;
    // subTask.endDate = this.addTaskForm.get('endDate').value;
    // subTask.task = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
    this.editTask.projectId = parseInt(this.selectedProject.split('-')[0].trim(), 11);
    this.editTask.userId = parseInt(this.selectedUser.split('-')[0].trim(), 11);

    this.taskService.editTask(this.wstaskId, this.editTask).subscribe(data => {
      this.resetForm();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error);
    })
  }

  cancelEdit() {
    this.router.navigate(['./'])
  }

  clearParent() {
    this.selectedParent = null;
    this.searchParent = null;
    this.addTaskForm.patchValue({
      parentTask: null
    });
  }

}