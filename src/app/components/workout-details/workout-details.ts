import {Component, inject, input} from '@angular/core';
import {Activity, Session} from '../../classes/state.interface';

import {IonItem, IonLabel, IonList} from '@ionic/angular/standalone';
import {ShowSets} from '../show-sets/show-sets';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-workout-details',
  imports: [
    IonItem,
    IonLabel,
    IonList,
    ShowSets,
  ],
  templateUrl: './workout-details.html',
  styleUrl: './workout-details.scss'
})
export class WorkoutDetails {
  service = inject(CommonService);
  session = input.required<Session>();
  protected readonly Activity = Activity;
}
