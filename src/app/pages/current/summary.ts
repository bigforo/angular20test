import {Component, inject, linkedSignal, signal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {Router, RouterLink} from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonButtons, IonChip,
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton, IonNote, IonSelect, IonSelectOption, IonText, IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {cloudDownload, shareOutline, star, starOutline, share} from 'ionicons/icons';
import {DatePipe} from '@angular/common';
import {Activity} from '../../classes/state.interface';
import {AlertController} from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-summary',
  imports: [
    RouterLink,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    DatePipe,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonNote,
    IonFooter,
    IonText,
    IonTextarea,
    IonAlert,
    IonChip,
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService);
  appState = this.service.appState;
  router = inject(Router);

  constructor() {
    addIcons({ shareOutline, starOutline, star, cloudDownload, share });
  }
  stop() {
    this.service.stopSession();
    this.service.save();
    // this.router.navigate(['/app/tabs/sessions']);
  }
  delete(activity: Activity, sliding: IonItemSliding) {
    this.service.deleteActivity(activity);
    this.service.save();
    sliding.close();
  }


  // alertController = inject(AlertController);
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Are you sure?',
  //     message: 'Older workout sessions can be found in the history tab.',
  //     buttons: [
  //       {text:"Yes",  handler: () => {this.stop()}},
  //       {text:"No",  handler: () => {}},
  //     ],
  //   });
  //   await alert.present();
  // }

  edit(activity: Activity) {
    this.router.navigate(['/'+activity.id]);
  }

  change($event: any) {
    this.service.addNoteToCurrentActivity($event.target.value);
  }

  delete213(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'yes') {
      this.stop();
    }
  }
  public alertButtons = [
    {
      text: 'Yes',
      role: 'yes',
    },
    {
      text: 'No',
      role: 'no',
    },
  ];
}
