import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { ITask } from '../add-task/Task';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  showEdit: boolean = true;
  task: ITask;
  tempplacehold: string;
  getTask: ITask;
  flipped: string = 'Flip';
  errorData: string = '';
  errorDisplay: boolean = false;

  constructor( private taskService: TaskService, private router: Router, private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.task = message)
    console.log(this.task);
  }

  flipTask() {
    this.tempplacehold = this.task.parentTaskName;
    this.task.parentTaskName = this.task.taskName;
    this.task.taskName = this.tempplacehold;
    if (this.flipped === 'Flipped!') {
      this.flipped = 'Flip';
    } else {
      this.flipped = 'Flipped!';
    }
  }


  editTask(edtask:ITask) {
    console.log(this.task);
    // if flipped send to different end point
    if (this.flipped === 'Flipped!') {
      this.taskService.updateFlipTask(this.task).subscribe((edtask) => { }, (err) => {
        console.log(err);
        this.errorData = err;
        this.errorDisplay = !this.errorDisplay;
      });
    } else {
    this.taskService.updateTask(this.task).subscribe((edtask) => { }, (err) => {
      console.log(err);
      this.errorData = err;
      this.errorDisplay = !this.errorDisplay;
    });
    }
  }
}
