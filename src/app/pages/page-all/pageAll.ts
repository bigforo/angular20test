import {Component, inject} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {AllSummary} from '../../components/all-summary/all-summary';
import {Session} from '../../classes/state.interface';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {
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
    IonItemOption
  ],
  templateUrl: './pageAll.html',
  styleUrl: './pageAll.scss'
})
export class PageAll {
  service = inject(CommonService);
  sessions = [...this.service.appState.history] as Session[];
  router = inject(Router);

  clear() {
    this.service.clearHistory();
    this.service.load();
    this.router.navigate(['/']);
  }
}
