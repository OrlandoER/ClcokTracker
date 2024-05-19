import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeLogService {
  private logs: { user: string, entry: Date, exit?: Date }[] = [];
  private lastEntryTime: Date | null = null;

  logEntry(user: string): boolean {
    const now = new Date();
    if (this.lastEntryTime && (now.getTime() - this.lastEntryTime.getTime()) < 60000) {
      return false;
    }
    this.logs.push({ user, entry: now });
    this.lastEntryTime = now;
    return true;
  }

  logExit(user: string): void {
    const log = this.logs.find(l => l.user === user && !l.exit);
    if (log) {
      log.exit = new Date();
    }
  }

  getLogs(): { user: string, entry: Date, exit?: Date }[] {
    return this.logs;
  }
}
