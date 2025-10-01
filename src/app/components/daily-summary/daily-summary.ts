import {Component, input} from '@angular/core';
import {DailyClass} from '../../classes/daily.class';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'daily-summary',
  imports: [
    DatePipe
  ],
  templateUrl: './daily-summary.html',
  styleUrl: './daily-summary.scss'
})
export class DailySummary {
  daily = input<DailyClass | null>();
}
