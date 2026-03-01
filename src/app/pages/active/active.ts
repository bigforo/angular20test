import {Component, inject, linkedSignal, signal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {Router, RouterLink} from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent, IonFab, IonFabButton,
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
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {cloudDownload, shareOutline, star, starOutline, share, stopCircleOutline, chevronForward, people, timerOutline} from 'ionicons/icons';
import {DatePipe} from '@angular/common';
import {Activity, Session} from '../../classes/state.interface';
import type { OverlayEventDetail } from '@ionic/core';
import {ExerciseSets} from '../../components/exercise-sets/exercise-sets';
import {SessionTips} from '../../components/session-tips/session-tips';
import {ShowSets} from '../../components/show-sets/show-sets';
import {ModalExercises} from '../../components/modal-exercises/modal-exercises';
import {ModalSets} from '../../components/modal-sets/modal-sets';
import {EXERCISES} from '../../classes/all-exercises.data';
import {ModalDescription} from '../../components/modal-description/modal-description';
import {PopupExercises} from '../../components/popup-exercises/popup-exercises';

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
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonNote,
    IonText,
    IonAlert,
    IonChip,
    SessionTips,
    ShowSets,
    IonFooter,
    ModalSets,
    ModalDescription,
    PopupExercises,
    IonFab,
    IonFabButton
  ],
  templateUrl: './active.html',
  styleUrl: './active.scss'
})
export class ActiveComponent {

  service = inject(CommonService);
  appState = this.service.appState;
  router = inject(Router);

  constructor() {
    addIcons({ shareOutline, starOutline, star, cloudDownload, share, stopCircleOutline, chevronForward, timerOutline });
  }

  async deleteActivity(activity: Activity, sliding: IonItemSliding) {
    await sliding.close();
    this.service.deleteActivity(activity);
    this.service.save();
  }

  endSessionConfirmation(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'yes') {
      this.service.stopSession();
      this.service.save();
    }
  }
  public alertButtons = [{text: 'Yes', role: 'yes',},{text: 'No',role: 'no',},];

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

  modalSetActivity = signal<Activity>(Activity.unknowActivity());
  modalSetOpen = signal<boolean> (false);
  modalRedirect(id: string) {
    let ex = EXERCISES.find(a=> a.id === id);
    if (!ex) return;
    let act = this.service.findActivityByExercise(id);
    if (!act) return;
    this.modalSetActivity.set(act);
    this.modalSetOpen.set(true);
  }
  modalClosed() {
    this.modalSetOpen.set(false);
  }

  modalCommentsSetOpen = signal<boolean> (false);


  clear(current: Session | null | undefined, sliding: IonItemSliding) {
    if (current) {
      current.note = "";
      this.service.save();
    }

    sliding.close();
  }

  protected readonly Activity = Activity;

  popupExercisesOpen = signal<boolean>(false);
  popupExercisesSelected(id: string) {
    this.service.startSessionIfNotStarted();
    this.service.findOrStartActivityByExercise(id);
  }
}
