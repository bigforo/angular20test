import {Component, inject, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {DailySummary} from '../../components/daily-summary/daily-summary';
import {LocalStorageService} from '../../classes/ls';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatChipListbox, MatChipListboxChange, MatChipOption} from '@angular/material/chips';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {cloudDownload, shareOutline, star, starOutline, share} from 'ionicons/icons';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [
    MatButton,
    DailySummary,
    RouterLink,
    MatChipListbox,
    MatChipOption,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon,

  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService);
  appState = this.service.appState;
  router = inject(Router);

  new() {
    this.service.stopSession();
    this.service.save();
    this.router.navigate(['/app/tabs/all']);
  }

  ls = inject(LocalStorageService);
  link = linkedSignal(()=>{
    return this.ls.getCompressed(this.appState().current) ?? "";
  });

  chipChange($event: MatChipListboxChange) {
    if ($event.value) {
      console.log($event.value);
    }
  }

  shareSession() {

  }
  constructor() {
    addIcons({ shareOutline, starOutline, star, cloudDownload, share });
  }
}
