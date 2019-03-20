import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../interfaces/Task';
import { ActivatedRoute , Router} from '@angular/router';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  // input from the form
  @Input() task = {
      taskID : 0,
      taskName: '',
      priority: 0,
      parentTaskName: '',
      startDate: new Date(),
      endDate: new Date()
    };

  // Form Group definition
  addTaskForm: FormGroup;

  // error message display
  errorData: string = '';
  errorDisplay: boolean = false;
  reloadmsg: string = 'relaodView';

  // Miscellaneous
  submitted = false;
  taskPorC: string = 'Click to Add Parent';
  show = false;
  hide = true;
  proceedAddInd: boolean = false;
  todaysDate: Date;
  enDtTemp: Date;
  strtDtTemp: Date;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router, private data: DataService) {}

  // Lets have form validations here
  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      priority: ['', Validators.min(5)],
      parentTaskName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  // when submit is clicked
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addTaskForm.invalid) {
      return;
    } else {
      this.addTask();
    }

  }

  // Add Child Tash.Rest POST request via task Service
  addTask() {
    this.task.taskID = 0;
    // console.log(this.addTaskForm.value);
    this.task = this.addTaskForm.value;
    // console.log(this.task);
    this.checkEndDate(this.task);

    if (this.proceedAddInd) {
    this.taskService.addTask(this.task).subscribe((task) => {}, (err) => {
      console.log(err);
      this.errorData = err;
      this.errorDisplay = !this.errorDisplay;
    });
    } else {
      this.errorData = 'End Date cannot be Before Begin date';
      this.errorDisplay = !this.errorDisplay;
    }
  }

  // if the end date is before start , error it out
  checkEndDate(addTask: ITask) {
    this.todaysDate = new Date();
    this.enDtTemp = new Date(addTask.endDate);
    this.strtDtTemp = new Date(addTask.startDate);
    // console.log('check today' + this.todaysDate.valueOf());
    // console.log('end check' + this.enDtTemp.valueOf());
    // console.log('start check' + this.strtDtTemp.valueOf());
    // See if end date isnt before start date
    if (this.strtDtTemp.valueOf() > this.enDtTemp.valueOf()) {
      this.proceedAddInd = false;
    } else {
      this.proceedAddInd = true;
    }
    // console.log(this.proceedAddInd);
  }

  // reset the task
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

  // Are we adding parent or child?
  decideParentChild() {
    console.log('parent child');
    if (this.taskPorC === 'Click to Add Parent') {
      this.taskPorC = 'Click to Add Child';
      this.show = true;
      this.hide = false;
    } else {
      this.taskPorC = 'Click to Add Parent';
      this.show = false;
      this.hide = true;
    }
    // console.log(this.taskPorC);
  }
}
