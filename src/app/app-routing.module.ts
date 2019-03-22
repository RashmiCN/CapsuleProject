import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddProjectComponent } from './add-project/add-project.component';

const routes: Routes = [
  { path: 'add-project', component: AddProjectComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-task', component: ViewTaskComponent },
  {
    path: '', redirectTo: '/view-task',
    pathMatch: 'full'
  },];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
