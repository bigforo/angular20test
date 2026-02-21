import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonIcon,
  IonLabel, IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {calendar, informationCircle, location, logoBuffer, menuOutline, people, radioButtonOn, walk} from 'ionicons/icons';

@Component({
    templateUrl: 'tabs-page.html',
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    RouterModule,
    IonMenuButton,
  ]
})
export class TabsPage {
  constructor() {
    addIcons({ logoBuffer, radioButtonOn, walk, menuOutline });
  }
}
