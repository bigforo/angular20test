import {Component, inject, input} from '@angular/core';
import {Activity, Session} from '../../classes/state.interface';
import {CommonService} from '../../classes/common.service';
import {DatePipe} from '@angular/common';
import {
  IonCol,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList, IonRow
} from '@ionic/angular/standalone';
import {ShowSets} from '../show-sets/show-sets';

@Component({
  selector: 'app-workout-details',
  imports: [
    DatePipe,
    IonItem,
    IonLabel,
    IonList,
    ShowSets,
    IonCol,
    IonRow
  ],
  templateUrl: './workout-details.html',
  styleUrl: './workout-details.scss'
})
export class WorkoutDetails {
  session = input<Session | null>();
  service = inject(CommonService);
  protected readonly Activity = Activity;
}
