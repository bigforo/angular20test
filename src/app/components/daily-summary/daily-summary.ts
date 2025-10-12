import {Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Session} from '../../classes/state.interface';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-daily-summary',
  imports: [
    DatePipe
],
  templateUrl: './daily-summary.html',
  styleUrl: './daily-summary.scss'
})
export class DailySummary {
  session = input<Session | null>();
  service = inject(CommonService);
}
