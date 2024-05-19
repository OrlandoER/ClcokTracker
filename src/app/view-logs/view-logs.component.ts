import { Component, OnInit } from '@angular/core';
import { TimeLogService } from '../time-log.service';

@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.css']
})
export class ViewLogsComponent implements OnInit {
  logs: { user: string, entry: Date, exit?: Date }[] = [];

  constructor(private timeLogService: TimeLogService) {}

  ngOnInit(): void {
    this.logs = this.timeLogService.getLogs();
  }
}

