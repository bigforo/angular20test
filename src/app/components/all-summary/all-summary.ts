import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Session} from '../../classes/state.interface';
import {RouterLink} from '@angular/router';

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
  sessions = input<Session[]>();
}
