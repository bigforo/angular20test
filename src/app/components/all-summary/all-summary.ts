import {Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Session} from '../../classes/state.interface';
import {RouterLink} from '@angular/router';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'all-summary',
  imports: [
    DatePipe,
    RouterLink,
  ],
  templateUrl: './all-summary.html',
  styleUrl: './all-summary.scss'
})
export class AllSummary {
  service = inject(CommonService)
  sessions = input<Session[]>();
}
