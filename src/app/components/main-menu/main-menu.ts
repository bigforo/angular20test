import {Component, inject} from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle, IonToggle
} from '@ionic/angular/standalone';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {addIcons} from 'ionicons';
import {
  accessibilityOutline,
  calendarOutline, hammer,
  help,
  informationCircleOutline, logIn, logoBuffer,
  logOut,
  mapOutline, moonOutline,
  peopleOutline,
  person, personAdd, radioButtonOn, server, walk
} from 'ionicons/icons';
import {CommonService} from '../../classes/common.service';
import {FormsModule} from '@angular/forms';
import {EXERCISES} from '../../classes/all-exercises.data';
import {Activity, Session} from '../../classes/state.interface';
import {ToastController} from '@ionic/angular';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs';

@Component({
  selector: 'app-main-menu',
  imports: [
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    RouterLink,
    RouterLinkActive,
    IonToggle,
    FormsModule
  ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss'
})
export class MainMenu {
  service = inject(CommonService);
  dark = this.service.darkModeOn;
  dark_: boolean = true;
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
      let ref = this._snackBar.open("Can't add! Finish current workout session!", "Close");
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
}
