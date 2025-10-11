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
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MainMenu} from './components/main-menu/main-menu';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonLabel
    , IonToggle, FormsModule, IonIcon, RouterLink, RouterLinkActive, MainMenu,],
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
}
