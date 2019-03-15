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

  // Input Data
  showEdit: boolean = true;
  task: ITask;
  tempplacehold: string;
  getTask: ITask;
  flipped: string = 'Flip';
  errorData: string = '';
  errorDisplay: boolean = false;

  constructor( private taskService: TaskService, private router: Router, private data: DataService) { }

  // we have a data service talking to view component
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.task = message)
    // console.log(this.task);
  }

  // flip parent and child
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

  // edit task PUT request
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
