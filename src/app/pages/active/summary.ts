import {Component, inject, linkedSignal, signal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {Router, RouterLink} from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPicker,
  IonPickerColumn, IonPickerColumnOption,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {cloudDownload, shareOutline, star, starOutline, share, stopCircleOutline, chevronForward, people, timerOutline} from 'ionicons/icons';
import {DatePipe, NgClass} from '@angular/common';
import {Activity, repeatOptions, weightOptions1} from '../../classes/state.interface';
import {AlertController} from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';
import {ExerciseSets} from '../../components/exercise-sets/exercise-sets';

@Component({
  selector: 'app-summary',
  imports: [
    RouterLink,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    DatePipe,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonNote,
    IonText,
    IonTextarea,
    IonAlert,
    IonChip,
    IonModal,
    IonCol,
    IonGrid,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
    IonRow,
    ExerciseSets
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService);
  appState = this.service.appState;
  router = inject(Router);

  constructor() {
    addIcons({ shareOutline, starOutline, star, cloudDownload, share, stopCircleOutline, chevronForward, timerOutline });
  }
  stop() {
    this.service.stopSession();
    this.service.save();
    // this.router.navigate(['/app/tabs/sessions']);
  }
  delete(activity: Activity, sliding: IonItemSliding) {
    this.service.deleteActivity(activity);
    this.service.save();
    sliding.close();
  }


  // alertController = inject(AlertController);
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Are you sure?',
  //     message: 'Older workout sessions can be found in the history tab.',
  //     buttons: [
  //       {text:"Yes",  handler: () => {this.stop()}},
  //       {text:"No",  handler: () => {}},
  //     ],
  //   });
  //   await alert.present();
  // }

  edit(activity: Activity) {
    this.router.navigate(['/'+activity.id]);
  }

  change($event: any) {
    this.service.addNoteToCurrentSession($event.target.value);
  }

  delete213(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'yes') {
      this.stop();
    }
  }
  public alertButtons = [
    {
      text: 'Yes',
      role: 'yes',
    },
    {
      text: 'No',
      role: 'no',
    },
  ];

  items = ['Chest Day', 'Back Day', 'Shoulders Day'];
  selectedItem? : string = this.service.appState().current?.type;
  chipClick(item: string) {
    if (this.selectedItem === item)
      this.selectedItem = undefined;
    else {
      this.selectedItem = item;
    }
    this.service.addTypeToCurrentSession(this.selectedItem);
  }

  clear() {
    this.service.clearSession()
  }

  protected readonly repeatOptions = repeatOptions;
  protected readonly weightOptions1 = weightOptions1;
}
