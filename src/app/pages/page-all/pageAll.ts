import {Component, inject} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {AllSummary} from '../../components/all-summary/all-summary';
import {Session} from '../../classes/state.interface';

@Component({
  selector: 'app-state',
  imports: [
    AllSummary
  ],
  templateUrl: './pageAll.html',
  styleUrl: './pageAll.scss'
})
export class PageAll {
  service = inject(CommonService);
  sessions = [...this.service.appState.history, this.service.appState.current] as Session[];
}
