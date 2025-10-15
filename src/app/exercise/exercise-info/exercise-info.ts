import {Component, inject, input, linkedSignal} from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonText, IonTextarea,
  IonTitle,
  IonToolbar,
  NavController
} from '@ionic/angular/standalone';
import {CommonService} from '../../classes/common.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Activity, Exercise} from '../../classes/state.interface';
import {EXERCISES} from '../../classes/all-exercises.data';
import {DatePipe, NgIf, NgStyle} from '@angular/common';
import {addIcons} from 'ionicons';
import {chevronBackOutline, chevronForwardOutline, location} from 'ionicons/icons';
import {FormsModule} from '@angular/forms';

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
    NgStyle,
    NgIf,
    IonIcon,
    IonList,
    IonItem,
    IonSelect,
    FormsModule,
    IonSelectOption,
    IonText,
    IonPopover,
    DatePipe,
    IonDatetime,
    IonInput,
    IonTextarea
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
  constructor() {
    addIcons({chevronForwardOutline, chevronBackOutline});
  }
  async click(activity: Activity | null) {
    if (activity == null) return;
    this.service.startSessionIfNotStarted();
    this.service.findOrStartActivityByExercise(activity.exercise);
    await this.router.navigate(['/app/tabs/current']);
  }

  protected readonly Activity = Activity;

  navyController = inject(NavController);
  selectCategory = {
    header: 'Select a Category',
  };
  navBack() {
    let exIndex = EXERCISES.findIndex(a=> a.id === this.id());
    if (exIndex == 0)
      return;
    let ex = EXERCISES[exIndex-1];
    this.navyController.navigateBack("exercise/" + ex.id)
  }

  navForward() {
    let exIndex = EXERCISES.findIndex(a=> a.id === this.id());
    if (exIndex === EXERCISES.length - 1)
      return;
    let ex = EXERCISES[exIndex+1];
    this.navyController.navigateForward("exercise/" + ex.id)
  }

  category = "";
  createDate = "1980-09-02";
}
