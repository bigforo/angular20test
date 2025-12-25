import {Component, inject, input, signal, Signal} from '@angular/core';
import {Activity, Session} from '../../classes/state.interface';
import {CommonService} from '../../classes/common.service';
import {DatePipe} from '@angular/common';
import {IonButton, IonItem, IonLabel, IonList, IonToolbar} from '@ionic/angular/standalone';
import {ShowSets} from '../show-sets/show-sets';

@Component({
  selector: 'app-workout-details',
  imports: [
    DatePipe,
    IonItem,
    IonLabel,
    IonList,
    ShowSets,
    IonButton,
    IonToolbar,
  ],
  templateUrl: './workout-details.html',
  styleUrl: './workout-details.scss'
})
export class WorkoutDetails {
  session = input<Session | null>();
  service = inject(CommonService);
  protected readonly Activity = Activity;
  modalSessionTimeUpdate = signal<boolean>(false);
}
