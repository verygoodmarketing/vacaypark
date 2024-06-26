import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(Auth);
  private signInWithEmailAndPassword = signInWithEmailAndPassword;
  private signOut = signOut;
  private router = inject(Router);

  async signIn(email: string, password: string) {
    try {
      await this.signInWithEmailAndPassword(this.afAuth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error signing in', error);
    }
  }

  async logOut() {
    await this.signOut(this.afAuth);
    this.router.navigate(['/login']);
  }
}
