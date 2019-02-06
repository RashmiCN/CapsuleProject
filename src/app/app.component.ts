import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskTracker';
  public show: boolean = false;

  toggle() {
    this.show = !this.show; }
}
