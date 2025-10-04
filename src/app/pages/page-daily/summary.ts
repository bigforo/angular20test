import {Component, inject} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {MatButton} from '@angular/material/button';
import {DailySummary} from '../../components/daily-summary/daily-summary';

@Component({
  selector: 'app-summary',
  imports: [
    MatButton,
    DailySummary
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService)

  new() {
    this.service.stopSession();
  }
}
