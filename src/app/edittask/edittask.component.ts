import { Component, OnInit } from '@angular/core';
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
  public showEdit: boolean = true;
  task :ITask;
  
  constructor(private taskService: TaskService, private router: Router, private data: DataService) { }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.task = message)
    console.log(this.task);  
  }  
  editTask(edtask:ITask) {
    console.log(this.task);
    this.taskService.updateTask(this.task).subscribe((edtask) => { }, (err) => {
      console.log(err);
    });
  }

}
