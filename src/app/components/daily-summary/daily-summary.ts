import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Activity, Session} from '../../classes/state.interface';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-daily-summary',
  imports: [
    RouterLink,
    DatePipe,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './daily-summary.html',
  styleUrl: './daily-summary.scss'
})
export class DailySummary {
  session = input<Session | null>();
  showDelete = input<boolean>(true);
  service = inject(CommonService);
  delete(activity: Activity) {
    this.service.deleteActivity(activity);
    this.service.save();
  }
}
