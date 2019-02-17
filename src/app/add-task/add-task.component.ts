import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ITask } from './Task';
import { ActivatedRoute , Router} from '@angular/router';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() task = {
      taskID : 0,
      taskName: '',
      priority: 0,
      parentTaskName: '',
      startDate: new Date(),
      endDate: new Date()
    };
  addTaskForm: FormGroup;
  reloadmsg: string = 'relaodView';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router, private data: DataService) {}
  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      priority: ['', Validators.min(5)],
      parentTaskName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addTaskForm.invalid) {
      return;
    } else {
      this.addTask();
    }

    // alert('SUCCESS!! :-)')
  }
  addTask() {
    this.task.taskID = 0;
    console.log(this.addTaskForm.value);
    this.task = this.addTaskForm.value;
    console.log(this.task);
    this.taskService.addTask(this.task).subscribe((task) => {}, (err) => {
      console.log(err);
    });
    // this.data.changeReloadMessage(this.reloadmsg);
  }
  resetTask() {
    this.task = {
      taskID : 0,
      taskName: '',
      priority: 0,
      parentTaskName: '',
      startDate: null,
      endDate: null
    };
  }
  get f() { return this.addTaskForm.controls; }
}
