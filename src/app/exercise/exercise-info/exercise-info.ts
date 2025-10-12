import {Component, inject, input, linkedSignal} from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons, IonContent,
  IonFooter,
  IonHeader, IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {CommonService} from '../../classes/common.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Activity, Exercise} from '../../classes/state.interface';
import {EXERCISES} from '../../classes/all-exercises.data';

@Component({
  selector: 'app-exercise-info',
  imports: [
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonButton,
    IonContent,
    IonLabel,
    IonBackButton
  ],
  templateUrl: './exercise-info.html',
  styleUrl: './exercise-info.scss'
})
export class ExerciseInfo {
  service = inject(CommonService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

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

  async click(ex: Exercise) {
    this.service.startSessionIfNotStarted();
    let activity = this.service.findActivityByExercise(ex);
    this.service.findOrStartActivityByExercise(activity?.exercise ?? ex);
    // this._snackBar.open('Exercise added to Workout Session. Click on it to start.', 'Close', {
    //   duration: 5000,
    //   politeness: "assertive",
    //   verticalPosition: "top",
    //   announcementMessage: "Exercise added to Workout Session.",
    // });
    await this.router.navigate(['/app/tabs/current']);
  }
}
