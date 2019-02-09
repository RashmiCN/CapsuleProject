import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from './add-task/Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  task : ITask = {
    taskName: '',
    priority: 0,
    parentTaskName: '',
    startDate: new Date(),
    endDate: new Date()
  };

  private messageSource = new BehaviorSubject<ITask>(this.task);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: ITask) {
    console.log(message);
    this.messageSource.next(message)
  }
}
