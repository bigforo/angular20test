import {Component, inject, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {MatButton} from '@angular/material/button';
import {DailySummary} from '../../components/daily-summary/daily-summary';
import {LocalStorageService} from '../../classes/ls';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [
    MatButton,
    DailySummary,
    RouterLink
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService)

  new() {
    this.service.stopSession();
    this.service.save();
  }

  ls = inject(LocalStorageService);
  link = linkedSignal(()=>{
    return this.ls.getCompressed(this.service.appState.current) ?? "";
  });
}
