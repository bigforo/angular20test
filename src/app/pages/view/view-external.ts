import {Component, inject, input, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {Session} from '../../classes/state.interface';
import {
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {WorkoutDetails} from '../../components/workout-details/workout-details';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'page-all',
  imports: [
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonContent,
    IonMenuButton,
    WorkoutDetails,
  ],
  templateUrl: './view-external.html',
  styleUrl: './view-external.scss'
})
export class ViewExternal {
  service = inject(CommonService);
  ls = inject(LocalStorageService);
  id = input<string>();
  uncomm = linkedSignal(
    ()=>{
      return this.ls.getUncompressed<Session>(this.id());
    }
  )
}
