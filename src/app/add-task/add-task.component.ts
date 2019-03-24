import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { IProject } from '../interfaces/Project';
import { ITask } from '../interfaces/Task';
import { IUser } from '../interfaces/User';
import { IParentTask } from '../interfaces/ParentTask';

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
  tempTask: ITask;
  editTask: ITask;
  addParent: IParentTask;
  editUser: IUser;
  tasktoedituser: ITask;
  taskIdtoedituser: ITask;
  thingstodotogettask: string;
  oldUser: string;
  oldUserId: string;
  savePTasNm: string;

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
        console.log(data);
        // TO DO
        this.addTaskForm.patchValue({
          task: data.task,
          priority: data.priority,
          ifParent: false,
          // parentTask: data.parentTaskId ? data.parentTaskId['parentTaskName'] : null,
          startDate: this.dateFormatter(new Date(data.startDate), 'yyyy-MM-dd'),
          endDate: this.dateFormatter(new Date(data.endDate), 'yyyy-MM-dd'),
        })
        this.projectService.getProject(data.projectId).subscribe(result => {
          this.addTaskForm.patchValue({
            project: result.project
          })
          this.selectedProject = result.projectId + '-' + result.project;
          console.log('comehere for modal11111111111111111');
          this.getParentTasks(result.projectId);
        })
        this.userService.getuserByProjectId(data.projectId).subscribe(res => {
          this.addTaskForm.patchValue({
            user: res.firstName + ' ' + res.lastName
          })
          this.selectedUser = res.userId + '-' + res.firstName + ' ' + res.lastName;
          this.oldUser = res.userId + '-' + res.firstName + ' ' + res.lastName;
          this.oldUserId = res.userId;
        })
        this.taskService.getParent(data.parentTaskId).subscribe(parnt => {
          this.addTaskForm.patchValue({
            parentTask: parnt.parentTaskName
          })
          this.selectedParent = data.parentTaskId;
        })
        // this.userService.getuser(data.userId).subscribe(res => {
        //   this.addTaskForm.patchValue({
        //     user: res.firstName + ' ' + res.lastName
        //   })
        //   this.selectedUser = res.userId + '-' + res.firstName + ' ' + res.lastName;
        // })
        this.addTaskForm.get('ifParent').disable();
        // this.selectedParent = data.parentTaskId ? data.parentTaskId['parentId'] + '-' + data.parentTaskId['parentTaskName'] : null;
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
    // this.taskService.getParents(id).subscribe(data => {
    this.taskService.getParents().subscribe(data => {
      this.parentsList = data;
      console.log(this.parentsList);
      console.log('this is our parent list' + this.parentsList);
      $('#ProjectModal').modal('hide');
    }, error => {
      console.log(error);
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
      return !this.addTaskForm.valid || this.addTaskForm.get('project').value;
    } else {
      console.log('here', !this.addTaskForm.valid ||
        !this.addTaskForm.get('project').value || this.addTaskForm.get('parentTask').value ||
        !this.addTaskForm.get('user').value)
      return !this.addTaskForm.valid ||
        !this.addTaskForm.get('project').value || this.addTaskForm.get('parentTask').value ||
        !this.addTaskForm.get('user').value;
    }
  }

  onAdd() {
    if (this.addTaskForm.get('ifParent').value) {
      console.log('Parent task');
      // this.addParent.parentId = parseInt(this.selectedProject.split('-')[0].trim(), 11);
      // this.addParent.parentTaskName = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
      this.tempTask = this.addTaskForm.value;
      this.savePTasNm = this.tempTask.task;
      console.log('this is intermediate task', this.savePTasNm );
      // this.addParent.parentTaskName = this.savePTasNm ;
      // console.log('this is Parent tobe inserted', this.addParent);
      this.taskService.addParent(this.savePTasNm).subscribe(data => {
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
      this.addTask.projectId = this.selectedProject.split('-')[0].trim();
      this.addTask.userId = this.selectedUser.split('-')[0].trim();
      this.addTask.parentTaskId = this.selectedParent ? this.selectedParent.split('-')[0].trim() : null;
      // subTask.priority = this.addTaskForm.get('priority').value;
      // subTask.startDate = this.addTaskForm.get('startDate').value;
      // subTask.endDate = this.addTaskForm.get('endDate').value;
      // subTask.task = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
      console.log(this.addTask);
      this.taskService.addTask(this.addTask).subscribe(data => {
        console.log(this.addTask);
        this.resetForm();
        this.updateUser();
        this.error = null;
      }, error => {
        this.error = 'Atleast one of the field has error !!';
        console.log(error);
      });
    }
  }

  updateUser() {
    console.log('in update user');
    console.log('lets see if we stil have add task', this.addTask)
    this.thingstodotogettask = this.addTask.projectId + '-' + this.addTask.parentTaskId + '-' + this.addTask.task;
    console.log(this.thingstodotogettask);
    this.taskService.getTaskIdbyParentNProject(this.thingstodotogettask).subscribe(taskRet => {
        this.tasktoedituser = taskRet;
        console.log(this.tasktoedituser);
        console.log(taskRet)
    }, error => {
        this.error = 'Problem getting the task id to update user !!';
        console.log(error);
    })

    this.userService.getuser(this.addTask.userId).subscribe(data => {
        data.taskId = this.tasktoedituser.taskId;
        this.editUser = data;
        console.log(this.editUser);
        this.userService.updateuser(this.editUser).subscribe(updatedusr =>{
          console.log('user edited!!!!!!!!!!!!!!!');
        }, error => {
            this.error = 'error updating user after inserting task!!';
            console.log(error);
        })
        // this.userService
    }, error => {
        this.error = 'Atleast one of the field has error !!';
        console.log(error);
    })
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

    this.editTask.parentTaskId = this.selectedParent ;
    // subTask.priority = this.addTaskForm.get('priority').value;
    // subTask.startDate = this.addTaskForm.get('startDate').value;
    // subTask.endDate = this.addTaskForm.get('endDate').value;
    // subTask.task = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
    this.editTask.projectId = this.selectedProject.split('-')[0].trim();
    this.editTask.userId = this.selectedUser.split('-')[0].trim();
    this.editTask.taskId = this.wstaskId;
    console.log('this is the task we are gonna edit' + this.editTask);
    this.taskService.editTask(this.editTask).subscribe(data => {
      this.resetForm();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error);
    });
    if(this.selectedUser !== this.oldUser) {
      console.log('this is our  new user update' + this.editTask.userId);
      this.userService.getuser(this.editTask.userId).subscribe(data => {
        data.taskId = this.wstaskId;
        this.editUser = data;
        console.log(this.editUser);
        this.userService.updateuser(this.editUser).subscribe(updatedusr => {
          console.log('user edited!!!!!!!!!!!!!!!');
        }, error => {
          this.error = 'error updating user after editing task!!';
          console.log(error);
        });
      }, error => {
          this.error = 'error getting user after editing task!!';
          console.log(error);
      });
      console.log('this is to untag old user to task' + this.oldUserId);
      this.userService.getuser(this.oldUserId).subscribe(data => {
        data.taskId = '0';
        this.editUser = data;
        console.log(this.editUser);
        this.userService.updateuser(this.editUser).subscribe(updatedusr => {
          console.log('old user edited!!!!!!!!!!!!!!!');
        }, error => {
          this.error = 'error updating old user after editing task!!';
          console.log(error);
        });
      }, error => {
        this.error = 'error getting user after editing task!!';
        console.log(error);
      })
    }
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