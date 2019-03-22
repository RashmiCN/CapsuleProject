import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildTaskFilterPipe } from './child-task-filter.pipe';
import { ParentTaskFilterPipe } from './parent-task-filter.pipe';
import { DateRangeFilterPipe } from './date-range-filter.pipe';
import { PriorityFilterPipe } from './priority-filter.pipe';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { FilterUserPipe } from './filter-user.pipe';
import { FilterProjectPipe } from './filter-project.pipe';
import { FilterParentTaskPipe } from './filter-parent-task.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    ChildTaskFilterPipe,
    ParentTaskFilterPipe,
    DateRangeFilterPipe,
    PriorityFilterPipe,
    AddUserComponent,
    AddProjectComponent,
    FilterUserPipe,
    FilterProjectPipe,
    FilterParentTaskPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
