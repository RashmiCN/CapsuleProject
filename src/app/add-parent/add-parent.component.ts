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
  // Define our inputs
  @Input() parent = {parentTaskName : ''};

  // Formgroup - validation purposes
  addParentTaskForm: FormGroup;

  // error message to display
  errorData: '';
  errorDisplay = false;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router, private data: DataService) { }

  // validator checks
  ngOnInit() {
    this.addParentTaskForm = this.formBuilder.group({
      parentTaskName: ['', Validators.required]
    });
  }

  // when Submit button is clicked
  onSubmit() {
      this.addParentTask();
  }

  // Add parent, Rest Post using task Service
  addParentTask() {
    this.parent.parentTaskName = this.addParentTaskForm.value;
    // console.log('adding parent task' + this.parent.parentTaskName);
    this.taskService.addParentTask(this.parent.parentTaskName).subscribe((task) => { }, (err) => {
      console.log(err);
      this.errorData = err;
      this.errorDisplay = !this.errorDisplay;
    });
  }
}
