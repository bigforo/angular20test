import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoBuffer, menuOutline, radioButtonOn, walk } from 'ionicons/icons';

@Component({
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="start">
          <ion-icon name="walk" />
          <ion-label>Exercises</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="current">
          <ion-icon name="radio-button-on" />
          <ion-label>Active Workout</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="sessions">
          <ion-icon name="logo-buffer" />
          <ion-label>History</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [
    `
      .tabbar {
        justify-content: center;
      }

      .tab-button {
        max-width: 200px;
      }
    `,
  ],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterModule],
})
export class TabsPage {
  constructor() {
    addIcons({ logoBuffer, radioButtonOn, walk, menuOutline });
  }
}
