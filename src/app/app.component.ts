import { Component } from '@angular/core';
import { EdittaskComponent } from './edittask/edittask.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskTracker';
  public show: boolean = false;
  public hide: boolean = true;
  toggle() {
    this.show = !this.show; }
  
}
