import { Component, inject, input, linkedSignal } from '@angular/core';
import { IonContent, IonHeader, IonIcon, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonService } from '../../classes/common.service';
import { LocalStorageService } from '../../classes/ls';
import { Session } from '../../classes/state.interface';

import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, homeOutline } from 'ionicons/icons';
import { WorkoutDetails } from '../../components/workout-details/workout-details';

@Component({
  selector: 'page-all',
  imports: [IonHeader, IonTitle, IonToolbar, IonContent, IonContent, WorkoutDetails, IonIcon, IonItem, RouterLink],
  templateUrl: './view-external.html',
  styleUrl: './view-external.scss',
})
export class ViewExternal {
  constructor() {
    addIcons({ home, homeOutline });
  }
  service = inject(CommonService);
  ls = inject(LocalStorageService);
  id = input.required<string>();
  uncomm = linkedSignal(() => {
    return this.ls.getUncompressed<Session>(this.id());
  });
}
