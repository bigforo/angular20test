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
    const d1 = new Date(time.toString());
    const d2 = new Date(time1.toString());
    const diffMs = d1.getTime() - d2.getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    return minutes;
  }
  activity = input.required<Activity>();
  service = inject(CommonService);

  protected readonly Activity = Activity;
}
