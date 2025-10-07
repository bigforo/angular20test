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
  informationCircleOutline, logIn,
  logOut,
  mapOutline, moonOutline,
  peopleOutline,
  person, personAdd
} from 'ionicons/icons';
import {addIcons} from 'ionicons';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonLabel
    , IonToggle, FormsModule, IonIcon,],
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
    this.dark = !this.dark;
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
    });
  }
}
