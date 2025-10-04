import {Component, inject, input, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {MatButton} from '@angular/material/button';
import {DailySummary} from '../../components/daily-summary/daily-summary';
import {Session} from '../../classes/state.interface';

@Component({
  selector: 'page-all',
  imports: [
    MatButton,
    DailySummary
  ],
  templateUrl: './page-import.html',
  styleUrl: './page-import.scss'
})
export class PageImport {
  id = input<string>();
  uncomm = linkedSignal(
    ()=>{
      return this.ls.getUncompressed<Session>(this.id());
    }
  )

  service = inject(CommonService);
  ls = inject(LocalStorageService);
  load(){
    if (this.uncomm())
      this.service.appState.current = this.uncomm() as  Session ;
  }
}
