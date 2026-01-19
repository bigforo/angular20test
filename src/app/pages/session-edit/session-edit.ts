import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {addIcons} from 'ionicons';
import {
  arrowBackOutline,
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
import {SetClass} from '../../classes/set.class';

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
    FormsModule,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonText,
    IonLabel
  ],
  providers:[DatePipe],
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
      ellipsisVertical,      });
  }
  ngOnInit(): void {
    this.session_copy = {...this.appState().history[+(this.id() ?? "0")]} as  Session;
  }
  private location = inject(Location);
  public update(){
    this.appState().history[+(this.id() ?? "0")] = this.session_copy;
    this.service.save();
    this.location.back();
  }

  protected readonly Activity = Activity;
  protected readonly Session = Session;

  datepipe = inject(DatePipe);
  setTime(time: Date) {
    // Date Pipe considers Local Time Zones
    return this.datepipe.transform(time, 'yyyy-MM-ddTHH:mm:ss');
  }

  change($event: string, set: SetClass) {
    set.time = new Date($event);
  }
}
