import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeLogService {
  private logs: { user: string, entry: Date, exit?: Date }[] = [];
  private lastEntryTime: Date | null = null;

  constructor() {
    this.loadLogs();
  }

  private saveLogs(): void {
    localStorage.setItem('timeLogs', JSON.stringify(this.logs));
  }

  private loadLogs(): void {
    const logs = localStorage.getItem('timeLogs');
    if (logs) {
      this.logs = JSON.parse(logs);
      // Convertir las fechas de nuevo a objetos Date
      this.logs.forEach(log => {
        log.entry = new Date(log.entry);
        if (log.exit) {
          log.exit = new Date(log.exit);
        }
      });
    }
  }

  logEntry(user: string): boolean {
    const now = new Date();
    if (this.lastEntryTime && (now.getTime() - this.lastEntryTime.getTime()) < 60000) {
      return false;
    }
    this.logs.push({ user, entry: now });
    this.lastEntryTime = now;
    this.saveLogs();
    return true;
  }

  logExit(user: string): void {
    const log = this.logs.find(l => l.user === user && !l.exit);
    if (log) {
      log.exit = new Date();
      this.saveLogs();
    }
  }

  getLogs(): { user: string, entry: Date, exit?: Date }[] {
    return this.logs;
  }
}