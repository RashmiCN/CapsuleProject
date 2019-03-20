import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITask } from './interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  reload: string;
  task: ITask = {
    taskID: 0,
    taskName: '',
    priority: 0,
    parentTaskName: '',
    startDate: new Date(),
    endDate: new Date()
  };

  private messageSource = new BehaviorSubject<ITask>(this.task);
  private messagetoReload = new Subject<string>();

  currentMessage = this.messageSource.asObservable();
  currentReloadmsg = this.messagetoReload.asObservable();

  constructor() { }

  changeMessage(message: ITask) {
    // console.log(message);
    this.messageSource.next(message)
  }

  changeReloadMessage(rMessage: string) {
    // console.log(rMessage);
    this.messagetoReload.next(rMessage)
  }
}
