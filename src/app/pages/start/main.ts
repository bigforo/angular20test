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

@Component({
  selector: 'app-main',
  imports: [RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonLabel,
    IonLabel, IonList, IonItem,],
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

  async click(ex: Exercise) {
    const activity = this.service.findActivityByExercise(ex);
    let act = this.service.findOrStartActivityByExercise(activity?.exercise ?? ex);
    await this.router.navigate(['/app/tabs/current']);
  }
}
