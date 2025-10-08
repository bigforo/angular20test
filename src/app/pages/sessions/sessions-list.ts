import {Component, inject, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {AllSummary} from '../../components/all-summary/all-summary';
import {Session} from '../../classes/state.interface';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonItem, IonItemDivider,
  IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonMenuButton, IonNote,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DatePipe} from '@angular/common';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-state',
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    DatePipe,
    RouterLink,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonItemSliding,
    IonItem,
    IonList,
    IonItemOptions,
    IonItemOption,
    IonButton,
    IonFooter,
    IonNote,
    IonAlert
  ],
  templateUrl: './sessions-list.html',
  styleUrl: './sessions-list.scss'
})
export class SessionsList {
  service = inject(CommonService);
  appState = this.service.appState;
  sessions = linkedSignal(()=>{
    return this.appState().history
  })
  router = inject(Router);

  constructor() {
    this.service.load();
  }
  clear() {
    this.service.clearHistory();
    this.router.navigate(['/app/tabs/sessions']);
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        // console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.clear();
      },
    },
  ];

  // alertController = inject(AlertController);
  // async presentAlert(session: Session) {
  //     const alert = await this.alertController.create({
  //       header: 'Are you sure?',
  //       // message: 'Older workout sessions can be found in the history tab.',
  //       buttons: [
  //         {text:"Yes",  handler: () => {this.service.deleteSessionFromHis(session)}},
  //         {text:"No",  handler: () => {}},
  //       ],
  //     });
  //     await alert.present();
  // }
  delete(session: Session, sliding: IonItemSliding) {
    this.service.deleteSessionFromHis(session);
    sliding.close();
  }
}
