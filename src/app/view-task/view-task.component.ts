import { Component, OnInit, SimpleChanges, OnChanges, Input} from '@angular/core';
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
  edit: string = 'Edit';
  @Input() reloadmsg:string = "";
  allTask : any[];
  public show: boolean = false; 
  private message : ITask;
  public showEdit: boolean = false; 
  vtask: ITask[];

  constructor(private taskService: TaskService, private router: Router, private data: DataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // //Add '${implements OnChanges}' to the class.
    // this.data.changeReloadMessage.subscribe(message => this.reloadmsg = message);
  }
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
    if(this.edit === 'Save!'){
      this.edit = 'Edit Task';
    }else {
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
