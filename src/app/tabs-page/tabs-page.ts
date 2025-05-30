import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {calendar, informationCircle, location, logoBuffer, people, radioButtonOn, walk} from 'ionicons/icons';

@Component({
    templateUrl: 'tabs-page.html',
    imports: [
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonLabel,
        RouterModule,
    ]
})
export class TabsPage {
  constructor() {
    addIcons({ logoBuffer, radioButtonOn, walk });
  }
}
