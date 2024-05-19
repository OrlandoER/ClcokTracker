import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [{ username: 'user1', password: 'pass1' }]; // Añadir más usuarios según sea necesario
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}
