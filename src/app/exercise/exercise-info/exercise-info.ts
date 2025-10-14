import {Component, inject, input, linkedSignal} from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons, IonContent,
  IonFooter,
  IonHeader, IonLabel, IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {CommonService} from '../../classes/common.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Activity, Exercise} from '../../classes/state.interface';
import {EXERCISES} from '../../classes/all-exercises.data';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-exercise-info',
  imports: [
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonButton,
    IonContent,
    IonLabel,
    IonMenuButton,
    NgStyle
  ],
  templateUrl: './exercise-info.html',
  styleUrl: './exercise-info.scss'
})
export class ExerciseInfo {
  service = inject(CommonService);
  private router = inject(Router);

  id = input<string>();
  activity = linkedSignal(() => {
    let ex = EXERCISES.find(a=> a.id === this.id());
    if (ex === undefined) return null;
    let act = this.service.findActivityByExercise(ex);
    if (act === undefined) return new Activity(ex);
    return act;
  });

  async click(activity: Activity | null) {
    if (activity == null) return;
    this.service.startSessionIfNotStarted();
    this.service.findOrStartActivityByExercise(activity.exercise);
    await this.router.navigate(['/app/tabs/current']);
  }

  protected readonly Activity = Activity;
}
