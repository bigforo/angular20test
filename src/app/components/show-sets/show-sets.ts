import {Component, inject, input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IonCol, IonGrid, IonLabel, IonRow, IonText} from "@ionic/angular/standalone";
import {Activity} from '../../classes/state.interface';
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

  activity = input.required<Activity>();
  service = inject(CommonService);

  protected readonly Activity = Activity;
}
