import {Component, inject, input, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {Session} from '../../classes/state.interface';
import {
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonItem,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import {WorkoutDetails} from '../../components/workout-details/workout-details';
import {MatButton} from '@angular/material/button';
import {addIcons} from 'ionicons';
import {
  home,
  homeOutline
} from 'ionicons/icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'page-all',
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonContent,
    WorkoutDetails,
    IonIcon,
    IonItem,
    RouterLink
],
  templateUrl: './view-external.html',
  styleUrl: './view-external.scss'
})
export class ViewExternal {
  constructor() {
    addIcons({home,homeOutline})
  }
  service = inject(CommonService);
  ls = inject(LocalStorageService);
  id = input.required<string>();
  uncomm = linkedSignal(()=>{
      return this.ls.getUncompressed<Session>(this.id());
    }
  )
}
