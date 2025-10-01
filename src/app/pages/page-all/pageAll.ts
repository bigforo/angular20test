import {Component, inject} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {DailySummary} from '../../components/daily-summary/daily-summary';

@Component({
  selector: 'app-state',
  imports: [
    DailySummary
  ],
  templateUrl: './pageAll.html',
  styleUrl: './pageAll.scss'
})
export class PageAll {
  service = inject(CommonService);
}
