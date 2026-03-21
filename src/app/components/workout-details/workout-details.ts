import { Component, inject, input } from '@angular/core';
import { Activity, Session } from '../../classes/state.interface';

import { IonItem, IonLabel, IonList, NavController } from '@ionic/angular/standalone';
import { CommonService } from '../../classes/common.service';
import { ShowSets } from '../show-sets/show-sets';

@Component({
  selector: 'app-workout-details',
  imports: [IonItem, IonLabel, IonList, ShowSets],
  templateUrl: './workout-details.html',
  styleUrl: './workout-details.scss',
})
export class WorkoutDetails {
  service = inject(CommonService);
  session = input.required<Session>();
  protected readonly Activity = Activity;

  navyController = inject(NavController);
  redirect(id: string) {
    void this.navyController.navigateForward('exercise/' + id);
  }
}
