import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { NgClass} from '@angular/common';
import {EXERCISES} from '../../classes/all-exercises.data';
import {
  IonIcon, IonItem,
  IonLabel, IonList,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {calendar, informationCircle,location, people} from 'ionicons/icons';
import {Activity, Exercise} from '../../classes/state.interface';
import {CommonService} from '../../classes/common.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  imports: [RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonLabel,
    IonLabel, IonList, IonItem, IonIcon,],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  protected readonly allExercises = EXERCISES;
  constructor() {
    addIcons({ calendar, people, location, informationCircle });
  }

  service = inject(CommonService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  async click(ex: Exercise) {
    const activity = this.service.findActivityByExercise(ex);
    this.service.findOrStartActivityByExercise(activity?.exercise ?? ex);
    this._snackBar.open('Exercise added to Workout Session. Click on it to start.', 'Close', {
      duration: 2000
    });
    await this.router.navigate(['/app/tabs/current']);
  }
}
