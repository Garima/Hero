import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hero Cycles';
    onDeactivate() {
        document.body.scrollTop = 0;
    }
}
