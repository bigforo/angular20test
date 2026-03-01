import {
  Component,
  computed,
  inject,
  model,
  output,
  signal,
  ViewChild
} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem, IonLabel, IonList, IonModal, IonSearchbar, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import {CommonService} from '../../classes/common.service';
import {Router} from '@angular/router';
import {addIcons} from 'ionicons';
import {addCircleOutline, addOutline, shareSocial} from 'ionicons/icons';
import {EXERCISES} from '../../classes/all-exercises.data';

@Component({
  selector: 'app-popup-exercises',
  imports: [
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonSearchbar,
    IonTitle,
    IonToolbar
  ],
  template: `
    <ion-modal [isOpen]="open()" [initialBreakpoint]="1" [breakpoints]="[0, 1]" >
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title>Select an exercise</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="clickToAddToCurrentWorkout(null)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-searchbar placeholder="Search" (ionInput)="searchInput($event)"/>
          <ion-list>
            @for (ex of filteredItems(); track ex){
              <ion-item  button="false" (click)="clickToAddToCurrentWorkout(ex.id)" >
                <ion-avatar slot="start">
                  <ion-img src="https://i.pravatar.cc/300?u={{ex.color}}1"/>
                </ion-avatar>
                <ion-label [style.border-left-color]="ex.color">
                  <h2>{{ ex.name }}</h2>
                  <p>{{ ex.description }}</p>
                </ion-label>
                <ion-icon color="medium" name="add-outline"/>
              </ion-item>
            }
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  styles: `
    ion-item ion-label {
      padding-left: 10px;
      border-left: 5px solid var(--ion-color-warning);
    }
  `
})
export class PopupExercises {

  @ViewChild(IonModal) modal!: IonModal;
  service = inject(CommonService);
  router = inject(Router);

  selected = output<string>();
  open = model.required<boolean>();


  constructor() {
    addIcons({shareSocial, addCircleOutline, addOutline,});
  }

  clickToAddToCurrentWorkout(id: string | null) {
    if (id) {
      this.selected.emit(id);
    }
    this.open.update(()=> false);
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
