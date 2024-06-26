import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <router-outlet /> `,
  styles: ``,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'vacaypark';
}
