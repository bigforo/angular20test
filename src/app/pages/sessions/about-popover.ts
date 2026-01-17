import {Component, inject, input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  IonButton, IonIcon,
  IonItem,
  IonLabel,
  IonList,
  PopoverController,
} from '@ionic/angular/standalone';

@Component({
    template: `
    <ion-list>
      <ion-item button (click)="close('https://go.foro.mk/')">
        <ion-label>Pico8 Tabla</ion-label>
      </ion-item>
      <ion-item button (click)="close('http://foro.mk/aeropress')">
        <ion-label>Aeropress</ion-label>
      </ion-item>
      <ion-item button (click)="close('http://foro.mk/v60')">
        <ion-label>V60</ion-label>
      </ion-item>
      <ion-item button (click)="support()">
        <ion-label>Go to gym</ion-label>
      </ion-item>
    </ion-list>
  `,
  imports: [IonList, IonItem, IonLabel],
    providers: [PopoverController]
})
export class PopoverPage {
  private router = inject(Router);
  private popoverCtrl = inject(PopoverController);

  support() {
    this.router.navigate(['/']);
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
