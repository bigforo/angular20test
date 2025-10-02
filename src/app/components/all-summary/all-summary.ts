import {Component, input} from '@angular/core';
import {DailyClass} from '../../classes/daily.class';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'all-summary',
  imports: [
    DatePipe
  ],
  templateUrl: './all-summary.html',
  styleUrl: './all-summary.scss'
})
export class AllSummary {
  daily = input<DailyClass | null>();
}
