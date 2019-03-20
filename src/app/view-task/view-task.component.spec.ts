import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PriorityFilterPipe } from '../priority-filter.pipe';
import { ViewTaskComponent } from './view-task.component';
import { ChildTaskFilterPipe } from '../child-task-filter.pipe';
import { ParentTaskFilterPipe } from '../parent-task-filter.pipe';
import { DateRangeFilterPipe } from '../date-range-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent, PriorityFilterPipe, ChildTaskFilterPipe, DateRangeFilterPipe, ParentTaskFilterPipe],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
