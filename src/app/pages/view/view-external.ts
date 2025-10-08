import {Component, inject, input, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {DailySummary} from '../../components/daily-summary/daily-summary';
import {Session} from '../../classes/state.interface';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'page-all',
  imports: [
    DailySummary,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonContent,
    IonMenuButton,
  ],
  templateUrl: './view-external.html',
  styleUrl: './view-external.scss'
})
export class ViewExternal {
  service = inject(CommonService);
  ls = inject(LocalStorageService);
  id = input<string>();
  uncomm = linkedSignal(
    ()=>{
      return this.ls.getUncompressed<Session>(this.id());
    }
  )
}
