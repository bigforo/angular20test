import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonAvatar, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonSearchbar, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendar, informationCircle, location, people } from 'ionicons/icons';
import { EXERCISES } from '../../classes/all-exercises.data';
import { CommonService } from '../../classes/common.service';

@Component({
  selector: 'app-main',
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonLabel, IonLabel, IonList, IonItem, IonAvatar, IonImg, IonSearchbar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  protected readonly allExercises = EXERCISES;
  constructor() {
    addIcons({ calendar, people, location, informationCircle });
  }
  router = inject(Router);

  service = inject(CommonService);

  navyController = inject(NavController);
  clickToNavigateToExerciseDetails(id: string) {
    void this.navyController.navigateForward('exercise/' + id);
  }

  items = signal(EXERCISES);
  query = signal('');

  filteredItems = computed(() => this.items().filter((i) => i.name?.toLowerCase().includes(this.query().toLowerCase()) || i.description?.toLowerCase().includes(this.query().toLowerCase())));

  searchInput(value: any) {
    this.query.set(value.detail.value);
  }
}
