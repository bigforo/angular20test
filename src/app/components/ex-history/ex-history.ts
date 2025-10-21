import {Component, inject, input, linkedSignal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IonCol, IonGrid, IonRow} from "@ionic/angular/standalone";
import {CommonService} from '../../classes/common.service';
import {EXERCISES} from '../../classes/all-exercises.data';

@Component({
  selector: 'app-ex-history',
    imports: [
        DatePipe,
        IonCol,
        IonGrid,
        IonRow
    ],
  templateUrl: './ex-history.html',
  styleUrl: './ex-history.scss'
})
export class ExHistory {
  service = inject(CommonService)
  id = input<string>();
  histActivities = linkedSignal(() => {
    let ex = EXERCISES.find(a=> a.id === this.id());
    if (ex){
      return this.service.getHistory(ex.id as string);
    }
    return null;
  })
}
