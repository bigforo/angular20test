import {Component, inject, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {AllSummary} from '../../components/all-summary/all-summary';
import {Session} from '../../classes/state.interface';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonItemDivider,
  IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DatePipe} from '@angular/common';

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
    IonButton
  ],
  templateUrl: './pageAll.html',
  styleUrl: './pageAll.scss'
})
export class PageAll {
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
    this.router.navigate(['/app/tabs/all']);
  }
}
