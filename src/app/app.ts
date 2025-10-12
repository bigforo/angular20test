import {Component, inject, OnInit} from '@angular/core';
import {CommonService} from './classes/common.service';
import {
  IonApp,
  IonContent, IonIcon, IonItem, IonLabel,
  IonList,
  IonListHeader,
  IonMenu, IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane, IonToggle
} from '@ionic/angular/standalone';
import {FormsModule} from '@angular/forms';
import {
  accessibilityOutline,
  calendarOutline,
  hammer,
  help,
  informationCircleOutline, logIn, logoBuffer,
  logOut,
  mapOutline, moonOutline,
  peopleOutline,
  person, personAdd, radioButtonOn, walk
} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Activity, Session} from './classes/state.interface';
import {EXERCISES} from './classes/all-exercises.data';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonLabel
    , IonToggle, FormsModule, IonIcon, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements  OnInit {
  service = inject(CommonService);
  dark = this.service.darkModeOn;

  ngOnInit() {
    this.service.load();
  }


  constructor() {
    addIcons({
      calendarOutline,
      peopleOutline,
      mapOutline,
      informationCircleOutline,
      person,
      help,
      logOut,
      logIn,
      personAdd,
      moonOutline,
      hammer,
      radioButtonOn,
      walk,
      logoBuffer,
      accessibilityOutline
    });
  }
  dark_: boolean = true;

  toggleDarkMode() {
    this.dark.set(this.dark_);
    document.documentElement.classList.toggle('ion-palette-dark', this.dark());
  }

  openTutorial() {

  }
  router = inject(Router);
  toast = inject(ToastController);
  _snackBar = inject(MatSnackBar);

  async presets(preset: string) {
    if (!this.service.appState().current != null && ((this.service.appState().current?.activities?.length??0) > 0))
    {
      await this.router.navigate(['/app/tabs/current']);

      this._snackBar.open("Can't add! Stop current workout session or swipe right to remove exercise!", "Close",{
        duration: 5000,
        verticalPosition: "top"
      });
      return;
    }
    else {
      this.service.appState().current = new Session("session-" + preset);

      if (preset === 'chest') {
        EXERCISES.forEach(ele => {
          if (
            ele.id === 'b1' ||
            ele.id === 'b2' ||
            ele.id === 'b3'
          ) {
            const act = new Activity(ele);
            this.service.appState().current?.activities.push(act);
          }
        });
      } else if (preset === 'back') {
        EXERCISES.forEach(ele => {
          if (
            ele.id === 'bk1' ||
            ele.id === 'bk2' ||
            ele.id === 'bk3'
          ) {
            const act = new Activity(ele);
            this.service.appState().current?.activities.push(act);
          }
        });
      }
      await this.router.navigate(['/app/tabs/current']);
    }

  }

  protected readonly allExercises = EXERCISES;
}
