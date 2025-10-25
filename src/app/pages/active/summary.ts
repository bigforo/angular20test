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
import {SessionTips} from '../../components/session-tips/session-tips';
import {ShowSets} from '../../components/show-sets/show-sets';
import {ModalExercises} from '../../components/modal-exercises/modal-exercises';
import {ModalSets} from '../../components/modal-sets/modal-sets';
import {EXERCISES} from '../../classes/all-exercises.data';
import {ModalDescription} from '../../components/modal-description/modal-description';

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
    ExerciseSets,
    SessionTips,
    ShowSets,
    ModalExercises,
    IonFooter,
    ModalSets,
    ModalDescription
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
  async delete(activity: Activity, sliding: IonItemSliding) {
    await sliding.close();
    this.service.deleteActivity(activity);
    this.service.save();

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

  items = ['Chest', 'Back', 'Shoulders', 'Legs'];
  selectedItem? : string = this.service.appState().current?.type;
  chipClick(item: string) {
    if (this.selectedItem === item)
      this.selectedItem = undefined;
    else {
      this.selectedItem = item;
    }
    this.service.addTypeToCurrentSession(this.selectedItem);
  }

  protected readonly repeatOptions = repeatOptions;
  protected readonly weightOptions1 = weightOptions1;
  openModal = signal<boolean>(false);
  viewId: string | undefined;

  addSet(id: string, sliding: IonItemSliding) {
    this.viewId = id;
    this.openModal.set(true);
    sliding.close();
  }


  modalSetActivity = signal<Activity>(new Activity(EXERCISES[0]));
  modalSetOpen = signal<boolean> (false);
  modalRedirect(id: string) {
    let ex = EXERCISES.find(a=> a.id === id);
    if (!ex) return;
    let act = this.service.findActivityByExercise(ex);
    if (!act) return;
    this.modalSetActivity.set(act);
    this.modalSetOpen.set(true);
  }
  modalClosed() {
    this.modalSetOpen.set(false);
  }

  modalCommentsSetOpen = signal<boolean> (false);
  modalCommentClosed() {
    this.modalCommentsSetOpen.set(false);
  }
}
