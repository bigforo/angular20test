import {Component, inject, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {Router, RouterLink} from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton, IonNote, IonSelect, IonSelectOption, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {cloudDownload, shareOutline, star, starOutline, share} from 'ionicons/icons';
import {DatePipe} from '@angular/common';
import {Activity} from '../../classes/state.interface';
import {AlertController} from '@ionic/angular';

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
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService);
  appState = this.service.appState;
  router = inject(Router);



  ls = inject(LocalStorageService);
  link = linkedSignal(()=>{
    return this.ls.getCompressed(this.appState().current) ?? "";
  });


  constructor() {
    addIcons({ shareOutline, starOutline, star, cloudDownload, share });
  }
  stop() {
    this.service.stopSession();
    this.service.save();
    // this.router.navigate(['/app/tabs/sessions']);
  }
  delete(activity: Activity) {
    this.service.deleteActivity(activity);
    this.service.save();
  }

  alertController = inject(AlertController);
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Older workout sessions can be found in the history tab.',
      buttons: [
        {text:"Yes",  handler: () => {this.stop()}},
        {text:"No",  handler: () => {}},
      ],
    });
    await alert.present();
  }

  edit(activity: Activity) {
    this.router.navigate(['/'+activity.id]);
  }
}
