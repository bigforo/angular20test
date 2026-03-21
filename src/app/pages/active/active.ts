import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonAlert, IonButton, IonButtons, IonChip, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonNote, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { addIcons } from 'ionicons';
import { chevronForward, cloudDownload, share, shareOutline, star, starOutline, stopCircleOutline, timerOutline } from 'ionicons/icons';
import { EXERCISES } from '../../classes/all-exercises.data';
import { CommonService } from '../../classes/common.service';
import { Activity, Session } from '../../classes/state.interface';
import { ModalDescription } from '../../components/modal-description/modal-description';
import { ModalSets } from '../../components/modal-sets/modal-sets';
import { PopupExercises } from '../../components/popup-exercises/popup-exercises';
import { SessionTips } from '../../components/session-tips/session-tips';
import { ShowSets } from '../../components/show-sets/show-sets';

@Component({
  selector: 'app-summary',
  imports: [RouterLink, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonItemOptions, IonItemOption, IonItemSliding, IonNote, IonText, IonAlert, IonChip, SessionTips, ShowSets, IonFooter, ModalSets, ModalDescription, PopupExercises, IonFab, IonFabButton],
  templateUrl: './active.html',
  styleUrl: './active.scss',
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
  public alertButtons = [
    { text: 'Yes', role: 'yes' },
    { text: 'No', role: 'no' },
  ];

  items = ['Chest', 'Back', 'Shoulders', 'Legs'];
  selectedItem?: string = this.service.appState().current?.type;
  chipClick(item: string) {
    if (this.selectedItem === item) this.selectedItem = undefined;
    else {
      this.selectedItem = item;
    }
    this.service.addTypeToCurrentSession(this.selectedItem);
  }

  modalSetActivity = signal<Activity>(Activity.unknowActivity());
  modalSetOpen = signal<boolean>(false);
  modalRedirect(id: string) {
    const ex = EXERCISES.find((a) => a.id === id);
    if (!ex) return;
    const act = this.service.findActivityByExercise(id);
    if (!act) return;
    this.modalSetActivity.set(act);
    this.modalSetOpen.set(true);
  }
  modalClosed() {
    this.modalSetOpen.set(false);
  }

  modalCommentsSetOpen = signal<boolean>(false);

  clear(current: Session | null | undefined, sliding: IonItemSliding) {
    if (current) {
      current.note = '';
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
