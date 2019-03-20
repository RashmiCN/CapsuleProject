import { Component, OnInit, SimpleChanges, OnChanges, Input} from '@angular/core';
import { ITask } from 'src/app/interfaces/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  edit: string = 'Edit';
  // Lets have input defined
  @Input() reloadmsg:string = "";
  allTask: any[];
  public show: boolean = false;
  private message : ITask;
  public showEdit: boolean = false;
  vtask: ITask[];
  public disableInd: boolean = false;
  public todaysDate: Date;
  public enDtTemp :Date;
  constructor(private taskService: TaskService, private router: Router, private data: DataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // //Add '${implements OnChanges}' to the class.
    // this.data.changeReloadMessage.subscribe(message => this.reloadmsg = message);
  }

  // Actions on Initialize
  ngOnInit() {
    this.getTasks();
  }

  toggle() {
    this.show = !this.show;
  }

  // edit task?
  openEdit() {
    this.showEdit = !this.showEdit;
  }

  // Get all tasks in system
  getTasks() {
    this.vtask = [];
    this.taskService.getTasks().subscribe((data) => {
      // console.log(data);
      this.vtask = data;
    });
  }

  // edit task?
  editTask(editTask:ITask) {
    if (this.edit === 'Save!'){
      this.edit = 'Edit Task';
    } else {
      this.edit = 'Save!';
    };
    console.log(editTask);
    if (this.edit === 'Save!') {
      this.taskService.updateTask(editTask)
      .subscribe((task) => { }, (err) => {
        console.log(err);
      })
    }
  }

  // edit talking to view on data service
  pushToEdit(editTask: ITask){
    this.checkEndDate(editTask);
    // console.log('the disable ind' + this.disableInd );
    if ( this.disableInd === true) {
      this.showEdit = !this.showEdit;
      // console.log('pushing task to servic');
      this.data.changeMessage(editTask);
    }
  }

  checkEndDate(editTask: ITask) {
    this.todaysDate = new Date();
    this.enDtTemp = new Date(editTask.endDate);
    // console.log('check today' + this.todaysDate.valueOf());
    // console.log('end check' + this.enDtTemp.valueOf());
    if (this.todaysDate.valueOf() <= this.enDtTemp.valueOf()) {
      this.disableInd = true;
    } else {
      this.disableInd = false;
    }
    // console.log(this.disableInd);
  }

  endTask(endTask:ITask) {
    // console.log(endTask);
    // console.log('before' + endTask.endDate);
    endTask.endDate = new Date();
    // console.log('after' + endTask.endDate);
    this.taskService.updateTask(endTask)
      .subscribe((task) => { }, (err) => {
        console.log(err);
      });
  }
}
