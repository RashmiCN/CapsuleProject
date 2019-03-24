import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterProjectPipe } from '../filter-project.pipe';
import { FilterParentTaskPipe } from '../filter-parent-task.pipe';
import { FilterUserPipe } from '../filter-user.pipe';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AddUserComponent,
        FilterProjectPipe,
        FilterParentTaskPipe,
        FilterUserPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
