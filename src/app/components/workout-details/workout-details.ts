import {Component, inject, input} from '@angular/core';
import {Activity, Session} from '../../classes/state.interface';
import {CommonService} from '../../classes/common.service';
import {DatePipe} from '@angular/common';
import {IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList} from '@ionic/angular/standalone';

@Component({
  selector: 'app-workout-details',
  imports: [
    DatePipe,
    IonItem,
    IonLabel,
    IonList
],
  templateUrl: './workout-details.html',
  styleUrl: './workout-details.scss'
})
export class WorkoutDetails {
  session = input<Session | null>();
  service = inject(CommonService);
  protected readonly Activity = Activity;
}
