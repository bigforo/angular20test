import {Component, inject} from '@angular/core';
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
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonLabel
    , IonToggle, FormsModule, IonIcon, RouterLink, RouterLinkActive,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'gym.foro.mk';
  service = inject(CommonService);
  loggedIn: boolean = false;
  dark: boolean = true;
  ngOnInit() {
    this.service.load();
  }

  logout() {

  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('ion-palette-dark', this.dark);
  }

  openTutorial() {

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
      logoBuffer
    });
  }
}
