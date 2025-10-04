import {Component, inject} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {AllSummary} from '../../components/all-summary/all-summary';
import {Session} from '../../classes/state.interface';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-state',
  imports: [
    AllSummary,
    MatButton
  ],
  templateUrl: './pageAll.html',
  styleUrl: './pageAll.scss'
})
export class PageAll {
  service = inject(CommonService);
  sessions = [...this.service.appState.history, this.service.appState.current] as Session[];

  clear() {
    this.service.clearHistory();
    this.service.load();
  }
}
