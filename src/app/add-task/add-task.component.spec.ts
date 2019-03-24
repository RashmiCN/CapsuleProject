import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterProjectPipe } from '../filter-project.pipe';
import { FilterParentTaskPipe } from '../filter-parent-task.pipe';
import { FilterUserPipe } from '../filter-user.pipe';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, RouterTestingModule
      ],
      declarations: [
        AddTaskComponent,
        FilterProjectPipe,
        FilterParentTaskPipe,
        FilterUserPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
