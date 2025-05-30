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
  person, personAdd, radioButtonOn, walk, walkOutline
} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
      accessibilityOutline,
      walkOutline,
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
  // toast = inject(ToastController);
  _snackBar = inject(MatSnackBar);

  // async presets(preset: string) {
  //   if (!this.service.appState().current != null && ((this.service.appState().current?.activities?.length??0) > 0))
  //   {
  //     await this.router.navigate(['/app/tabs/current']);
  //
  //     this._snackBar.open("Can't add! Stop current workout session or swipe left to remove exercise!", "Close",{
  //       duration: 5000,
  //       verticalPosition: "top"
  //     });
  //     return;
  //   }
  //   else {
  //     const ses = new Session("session");
  //     ses.type = preset;
  //     this.service.appState().current = ses;
  //
  //
  //     if (preset === 'Chest day') {
  //       EXERCISES.forEach(ele => {
  //         if (
  //           ele.id === 'b1' ||
  //           ele.id === 'b2' ||
  //           ele.id === 'b3'
  //         ) {
  //           const act = new Activity(ele);
  //           this.service.appState().current?.activities.push(act);
  //         }
  //       });
  //     } else if (preset === 'Back day') {
  //       EXERCISES.forEach(ele => {
  //         if (
  //           ele.id === 'bk1' ||
  //           ele.id === 'bk2' ||
  //           ele.id === 'bk3'
  //         ) {
  //           const act = new Activity(ele);
  //           this.service.appState().current?.activities.push(act);
  //         }
  //       });
  //     } else if (preset === 'Shoulders day'){
  //       EXERCISES.forEach(ele => {
  //         if (
  //           ele.id === 'ab1' ||
  //           ele.id === 'ab2'
  //         ) {
  //           const act = new Activity(ele);
  //           this.service.appState().current?.activities.push(act);
  //         }
  //       });
  //     }
  //     await this.router.navigate(['/app/tabs/current']);
  //   }
  //
  // }
  //
  // protected readonly allExercises = EXERCISES;
}
