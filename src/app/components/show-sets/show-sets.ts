import {Component, inject, input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IonCol, IonGrid, IonLabel, IonRow, IonText} from "@ionic/angular/standalone";
import {Activity, Exercise} from '../../classes/state.interface';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-show-sets',
  imports: [
    DatePipe,
    IonCol,
    IonLabel,
    IonRow,
    IonGrid,
    IonText
  ],
  templateUrl: './show-sets.html',
  styleUrl: './show-sets.scss'
})
export class ShowSets {
  diff(time: Date, time1: Date) {
      console.log("diff",time,time1);
  }
  activity = input.required<Activity>();
  service = inject(CommonService);

}
