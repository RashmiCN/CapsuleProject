import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { ITask } from '../add-task/Task';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  task = {
    taskName: '',
    priority: 0,
    parentTaskName: '',
    startDate: new Date(),
    endDate: new Date()
  };
  constructor(private taskService: TaskService, private router: Router) { }
  ngOnInit() {
  }
  editTask(edtask:ITask) {
    console.log(this.task);
    this.taskService.updateTask(this.task).subscribe((edtask) => { }, (err) => {
      console.log(err);
    });
  }

}
