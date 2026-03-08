import { DatePipe } from '@angular/common';
import { Component, inject, input, linkedSignal, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import 'add-to-calendar-button';
import { EXERCISES } from '../../classes/all-exercises.data';
import { CommonService } from '../../classes/common.service';
import { SetClass } from '../../classes/set.class';
import { Activity, repeatOptions, weightOptions1 } from '../../classes/state.interface';
import { ExHistory } from '../../components/ex-history/ex-history';
import { ShowSets } from './show-sets/show-sets';

@Component({
  selector: 'app-option4',
  imports: [ReactiveFormsModule, ShowSets, MatButtonToggleGroup, MatButtonToggle, MatButtonToggleGroup, DatePipe, IonButtons, IonHeader, IonTitle, IonToolbar, IonContent, IonBackButton, IonButton, ExHistory],
  templateUrl: './show-exercise.html',
  styleUrl: './show-exercise.scss',
})
export class ShowExercise implements OnInit {
  ngOnInit(): void {
    this.service.getAllHistoryByActivityId(this.id() as string);
  }
  service = inject(CommonService);

  id = input<string>();
  activity = linkedSignal(() => {
    let ex = EXERCISES.find((a) => a.id === this.id());
    if (ex === undefined) return Activity.unknowActivity();
    let act = this.service.findActivityByExercise(ex.id);
    if (act === undefined) return new Activity(ex.id);
    return act;
  });
  exercise = linkedSignal(() => {
    return Activity.exerciseById(this.id() ?? '');
  });

  reps: any;
  kgs: any;
  private router = inject(Router);

  addSet(reps: string, kgs: string) {
    this.service.startSessionIfNotStarted();
    let act = this.service.findOrStartActivityByExercise(this.activity().id);
    this.activity.set(act);

    if (reps !== '') {
      if (kgs !== '') {
        this.activity().sets.push(new SetClass(reps, kgs));
      } else {
        this.activity().sets.push(new SetClass(reps, ''));
      }
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
