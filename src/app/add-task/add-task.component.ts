import { Component, OnInit, Input } from '@angular/core';
import { ITask } from './Task';
import { ActivatedRoute , Router} from '@angular/router';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() task = {
      taskName: '',
      priority: 0,
      parentTaskName: '',
      startDate: new Date(),
      endDate: new Date()
    };
  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit() {
  }
  addTask() {
    console.log(this.task);
    this.taskService.addTask(this.task).subscribe((task) => {}, (err) => {
      console.log(err);
    });
  }
  resetTask() {
    this.task = {
      taskName: '',
      priority: 0,
      parentTaskName: '',
      startDate: null,
      endDate: null
    };
  }
}
