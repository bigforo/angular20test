import {Component, inject, input, linkedSignal, signal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ShowSets} from './show-sets/show-sets';
import 'add-to-calendar-button';
import {CommonService} from '../../classes/common.service';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {DatePipe} from '@angular/common';
import {EXERCISES} from '../../classes/all-exercises.data';
import {Activity, Exercise, Session} from '../../classes/state.interface';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-option4',
  imports: [
    ReactiveFormsModule,
    ShowSets,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButtonToggleGroup,
    DatePipe,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonBackButton
  ],
  templateUrl: './show-exercise.html',
  styleUrl: './show-exercise.scss'
})
export class ShowExercise {
  service = inject(CommonService)

  id = input<string>();
  internalId = linkedSignal(() => {
    let ex = EXERCISES.find(a=> a.id === this.id());
    if (!ex){
      return "UNKNOWN";
    }
    this.service.startSessionIfNotStarted();
    this.activity = this.service.startActivity(ex);
    return ex.name;
  });

  activity = new Activity(EXERCISES[0]);
  reps: any;
  kgs: any;

  addSet(reps: string, kgs: any) {
    if ( (!this.activity.hasSize && +reps > 0) || (this.activity.hasSize && +kgs > 0)) {
      this.activity.addSet(reps, kgs);
      this.service.save();
    }
  }

}
