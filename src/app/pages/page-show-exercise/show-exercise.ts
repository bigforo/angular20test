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
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton, IonPicker, IonPickerColumn, IonPickerColumnOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import {SetClass} from '../../classes/set.class';


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
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption
  ],
  templateUrl: './show-exercise.html',
  styleUrl: './show-exercise.scss'
})
export class ShowExercise {
  service = inject(CommonService)

  id = input<string>();
  activity = linkedSignal(() => {
    let ex = EXERCISES.find(a=> a.id === this.id());
    if (!ex){
      return new Activity({weightOptions: [], name:"Unknown",id:"00"});
    }
    let act = this.service.findActivityByExercise(ex);
    if (act === undefined) {
      return new Activity(ex);
    }
    return act;
  });

  reps: any;
  kgs: any;
  private router = inject(Router);

  addSet(reps: string, kgs: any) {

    this.service.startSessionIfNotStarted();
    let act = this.service.findOrStartActivityByExercise(this.activity().exercise);
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


}
