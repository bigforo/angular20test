import {Component, inject, input, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {JsonPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {DailyClass} from '../../classes/daily.class';

@Component({
  selector: 'app-share',
  imports: [
    JsonPipe,
    MatButton
  ],
  templateUrl: './share.html',
  styleUrl: './share.scss'
})
export class Share {
  id = input<string>();
  uncomm = linkedSignal(
    ()=>{
      return this.ls.getUncompressed<DailyClass>(this.id());
    }
  )

  service = inject(CommonService);
  ls = inject(LocalStorageService);
  load(){
    if (this.uncomm())
      this.service.appState.daily = this.uncomm() as DailyClass;
  }
}
