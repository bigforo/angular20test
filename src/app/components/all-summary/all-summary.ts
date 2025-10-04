import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Session} from '../../classes/state.interface';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'all-summary',
  imports: [
    DatePipe,
    RouterLink,
    MatButton
  ],
  templateUrl: './all-summary.html',
  styleUrl: './all-summary.scss'
})
export class AllSummary {
  sessions = input<Session[]>();
}
