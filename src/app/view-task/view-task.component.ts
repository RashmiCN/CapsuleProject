import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/add-task/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  edit: string = 'Edit Task';
  allTask : any[];
  public show: boolean = false; 
  private message : ITask;
  public showEdit: boolean = false; 
  vtask: ITask[] 
  // [
  //   {
  //     taskName: 'Child Task 1',
  //     priority: 10,
  //     parentTaskName: 'Parent Task1',
  //     startDate: new Date('01/01/2019'),
  //     endDate: new Date('02/02/2019')
  //   },
  //   {
  //     taskName: 'Child Task 2',
  //     priority: 20,
  //     parentTaskName: 'Parent Task1',
  //     startDate: new Date('03/03/2019'),
  //     endDate: new Date('04/04/2019')
  //   },
  //   {
  //     taskName: 'Child Task 3',
  //     priority: 30,
  //     parentTaskName: 'Parent Task2',
  //     startDate: new Date('05/05/2019'),
  //     endDate: new Date('06/06/2019')
  //   },
  //   {
  //     taskName: 'Child Task 3',
  //     priority: 40,
  //     parentTaskName: 'Parent Task1',
  //     startDate: new Date('07/07/2019'),
  //     endDate: new Date('08/08/2019')
  //   },
  //   {
  //     taskName: 'Child Task 4',
  //     priority: 50,
  //     parentTaskName: 'Parent Task2',
  //     startDate: new Date('09/09/2019'),
  //     endDate: new Date('10/10/2019')
  //   },
  // ];
  constructor(private taskService: TaskService, private router: Router, private data: DataService) { }
  
  ngOnInit() {
    this.getTasks();
  }
  toggle() {
    this.show = !this.show;
  }
  openEdit() {
    this.showEdit = !this.showEdit;
  }
  getTasks() {
    this.vtask = [];
    this.taskService.getTasks().subscribe((data) => {
      console.log(data);
      this.vtask = data;
    });
  }

  editTask(editTask:ITask) {
    if(this.edit == 'Save!'){
      this.edit = 'Edit Task';
    }else {
      this.edit = 'Save!';
    };
    console.log(editTask);
    if (this.edit == 'Save!') {
      this.taskService.updateTask(editTask)
      .subscribe((task) => { }, (err) => {
        console.log(err);
      })
    }
  }

  pushToEdit(editTask: ITask){
    this.showEdit = !this.showEdit;
    console.log("pushing task to service");
    this.data.changeMessage(editTask);
  }
  endTask(endTask:ITask) {
    console.log(endTask);
    this.taskService.updateTask(endTask)
      .subscribe((task) => { }, (err) => {
        console.log(err);
      });
  }
}
