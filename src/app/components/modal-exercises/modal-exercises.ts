import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {
  IonAvatar,
  IonButton, IonButtons,
  IonContent, IonFab, IonFabButton, IonHeader, IonIcon,
  IonImg,
  IonItem, IonLabel,
  IonList,
  IonModal,
  IonSearchbar, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import {EXERCISES} from '../../classes/all-exercises.data';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonService} from '../../classes/common.service';
import {addCircleOutline, addOutline, shareSocial} from 'ionicons/icons';
import {addIcons} from 'ionicons';

@Component({
  selector: 'app-modal-exercises',
  imports: [
    IonModal,
    IonButton,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonFab,
    IonFabButton,
    IonIcon
  ],
  templateUrl: './modal-exercises.html',
  styleUrl: './modal-exercises.scss'
})
export class ModalExercises {
  @ViewChild(IonModal) modal!: IonModal;
  service = inject(CommonService);
  router = inject(Router);
  constructor() {
    addIcons({
      shareSocial,
      addCircleOutline,
      addOutline,
    });
  }


  clickToAddToCurrentWorkout(id: string) {
    let ex = EXERCISES.find(a => a.id === id);
    if (ex != undefined) {
      this.service.startSessionIfNotStarted();
      this.service.findOrStartActivityByExercise(id);
      void this.modal.dismiss(null);
    }
  }

  items = signal(EXERCISES);
  query = signal('');

  filteredItems = computed(() =>
    this.items().filter(i =>
      i.name?.toLowerCase().includes(this.query().toLowerCase())
      || i.description?.toLowerCase().includes(this.query().toLowerCase())
    )
  );

  searchInput(value: any) {
    this.query.set(value.detail.value);
  }
}
