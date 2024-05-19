import { Component } from '@angular/core';
import { TimeLogService } from '../time-log.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  message: string = '';

  constructor(private timeLogService: TimeLogService, private authService: AuthService) {}

  logEntry(): void {
    const user = 'user1'; // Aquí deberías obtener el usuario autenticado
    if (this.timeLogService.logEntry(user)) {
      this.message = 'Hora de entrada registrada';
    } else {
      this.message = 'Ya se registró una entrada en este minuto';
    }
  }

  logExit(): void {
    const user = 'user1'; // Aquí deberías obtener el usuario autenticado
    this.timeLogService.logExit(user);
    this.message = 'Hora de salida registrada';
  }
}
