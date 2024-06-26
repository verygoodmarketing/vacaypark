import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports array
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onLogin()">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        required
        [(ngModel)]="email"
        name="email"
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        required
        [(ngModel)]="password"
        name="password"
      />

      <button type="submit">Login</button>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);

  email!: string;
  password!: string;

  onLogin() {
    this.authService.signIn(this.email, this.password);
  }
}
