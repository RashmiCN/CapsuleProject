import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {
  @Input() parent = {parentTaskName : ''};

  addParentTaskForm: FormGroup;
  errorData: '';
  errorDisplay = false;
  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router, private data: DataService) { }

  ngOnInit() {
    this.addParentTaskForm = this.formBuilder.group({
      parentTaskName: ['', Validators.required]
    });
  }
  onSubmit() {
      this.addParentTask();
  }


  addParentTask() {
    this.parent.parentTaskName = this.addParentTaskForm.value;
    console.log('adding parent task' + this.parent.parentTaskName);
    this.taskService.addParentTask(this.parent.parentTaskName).subscribe((task) => { }, (err) => {
      console.log(err);
      this.errorData = err;
      this.errorDisplay = !this.errorDisplay;
    });
    // this.data.changeReloadMessage(this.reloadmsg);
  }
}
