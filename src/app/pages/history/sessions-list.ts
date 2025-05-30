import {Component, inject, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {AllSummary} from '../../components/all-summary/all-summary';
import {Activity, Session} from '../../classes/state.interface';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonItem, IonItemDivider,
  IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonMenuButton, IonNote, IonText,
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
    IonLabel,
    IonItemSliding,
    IonItem,
    IonList,
    IonItemOptions,
    IonItemOption,
    IonText
],
  templateUrl: './sessions-list.html',
  styleUrl: './sessions-list.scss'
})
export class SessionsList {
  service = inject(CommonService);
  appState = this.service.appState;
  sessions = linkedSignal(()=>{
    return this.appState().history
  });
  router = inject(Router);

  constructor() {
    this.service.load();
  }

  delete(session: Session, sliding: IonItemSliding) {
    this.service.deleteSessionFromHis(session);
    sliding.close();
  }

  protected readonly Activity = Activity;
}
