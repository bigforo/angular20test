import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonDatetime, IonDatetimeButton, IonFooter,
  IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from '@angular/router';
import {LocalStorageService} from '../../classes/ls';
import {addIcons} from 'ionicons';
import {
  cloudDownload,
  copy,
  ellipsisHorizontal,
  ellipsisVertical,
  share,
  shareOutline,
  star,
  starOutline
} from 'ionicons/icons';
import {WorkoutDetails} from "../../components/workout-details/workout-details";
import {Activity, Session} from '../../classes/state.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-view',
  imports: [
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonButton,
    IonIcon,
    RouterLink,
    WorkoutDetails,
    IonFooter,
    IonList,
    IonItem,
    IonInput,
    IonDatetime,
    IonModal,
    IonDatetimeButton,
    FormsModule
  ],
  templateUrl: './session-edit.html',
  styleUrl: './session-edit.scss'
})
export class SessionEdit implements OnInit {
  service = inject(CommonService);
  router = inject(Router);
  appState = this.service.appState;
  id = input<string>();
  session_copy = {...this.appState().history[+(this.id() ?? "0")]} as  Session;
  constructor() {
    addIcons({ shareOutline, starOutline, star, cloudDownload, share, ellipsisHorizontal,
      ellipsisVertical });
  }

  ngOnInit(): void {
    this.session_copy = {...this.appState().history[+(this.id() ?? "0")]} as  Session;

  }

  public update(){
    this.appState().history[+(this.id() ?? "0")] = this.session_copy;
    this.service.save();
    this.router.navigate(['/app/tabs/sessions']);
  }

  protected readonly Activity = Activity;
  protected readonly Session = Session;
}
