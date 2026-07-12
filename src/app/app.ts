import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  accessibilityOutline,
  calendarOutline,
  hammer,
  help,
  informationCircleOutline,
  logIn,
  logoBuffer,
  logOut,
  mapOutline,
  moonOutline,
  peopleOutline,
  person,
  personAdd,
  radioButtonOn,
  walk,
  walkOutline,
} from 'ionicons/icons';
import { VERSION } from '../environments/version';
import { CommonService } from './classes/common.service';

interface NativeAppMessage {
  action: string;
  value: string;
}

interface WebKitWindow extends Window {
  webkit?: {
    messageHandlers?: {
      nativeApp?: {
        postMessage(message: NativeAppMessage): void;
      };
    };
  };
}

@Component({
  selector: 'app-root',
  imports: [
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonToggle,
    FormsModule,
    IonIcon,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  service = inject(CommonService);
  dark = this.service.darkModeOn;
  ver = VERSION;

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
  dark_ = true;

  toggleDarkMode() {
    this.dark.set(this.dark_);
    document.documentElement.classList.toggle('ion-palette-dark', this.dark());
  }

  openTutorial() {}
  router = inject(Router);
  // toast = inject(ToastController);
  _snackBar = inject(MatSnackBar);

  sendSwift() {
    const message: NativeAppMessage = {
      action: 'openMenu',
      value: 'hello',
    };
    const nativeApp = (window as WebKitWindow).webkit?.messageHandlers?.nativeApp;

    if (nativeApp) {
      nativeApp.postMessage(message);
      return;
    }

    this._snackBar.open('Native iOS WebView bridge is not available.', 'Close', {
      duration: 3000,
    });
  }
}
