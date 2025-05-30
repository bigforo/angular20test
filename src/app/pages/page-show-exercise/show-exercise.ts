import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ShowSets} from './show-sets/show-sets';
import 'add-to-calendar-button';
import {CommonService} from '../../classes/common.service';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {DatePipe} from '@angular/common';
import {EXERCISES} from '../../classes/all-exercises.data';
import {Activity, repeatOptions, weightOptions1} from '../../classes/state.interface';
import {
  IonBackButton, IonButton,
  IonButtons, IonCol,
  IonContent, IonGrid,
  IonHeader, IonLabel,
  IonPicker, IonPickerColumn, IonPickerColumnOption, IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import {SetClass} from '../../classes/set.class';
import {ExerciseSets} from '../../components/exercise-sets/exercise-sets';
import {ExHistory} from '../../components/ex-history/ex-history';


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
    IonBackButton,
    IonButton,
    ExHistory
],
  templateUrl: './show-exercise.html',
  styleUrl: './show-exercise.scss'
})
export class ShowExercise implements  OnInit {
  ngOnInit(): void {
      this.service.getAllHistoryByActivityId(this.id() as string);
  }
  service = inject(CommonService)

  id = input<string>();
  activity = linkedSignal(() => {
    let ex = EXERCISES.find(a=> a.id === this.id());
    if (ex === undefined) return Activity.unknowActivity();
    let act = this.service.findActivityByExercise(ex.id);
    if (act === undefined) return new Activity(ex.id);
    return act;
  });
  exercise = linkedSignal(() => {
    return Activity.exerciseById(this.id()??"");
  })


  reps: any;
  kgs: any;
  private router = inject(Router);

  addSet(reps: string, kgs: any) {

    this.service.startSessionIfNotStarted();
    let act = this.service.findOrStartActivityByExercise(this.activity().id);
    this.activity.set(act);

    if ( (!this.activity().hasSize && +reps > 0) || (this.activity().hasSize && +kgs > 0)) {
      if (this.activity().hasSize)
        this.activity().sets.push(new SetClass(reps, kgs));
      else
        this.activity().sets.push(new SetClass(reps, ""));

      this.service.save();
    }
  }

  clickEnd() {
    this.router.navigate(['/app/tabs/current']);
  }


  protected readonly Activity = Activity;
  protected readonly EXERCISES = EXERCISES;
  protected readonly weightOptions1 = weightOptions1;
  protected readonly repeatOptions = repeatOptions;
}
