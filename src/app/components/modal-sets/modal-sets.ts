import {Component, inject, input, output, signal} from '@angular/core';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonModal, IonSearchbar, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {EXERCISES} from '../../classes/all-exercises.data';
import {DatePipe} from '@angular/common';
import {ExHistory} from '../ex-history/ex-history';
import {ShowSets} from '../../pages/page-show-exercise/show-sets/show-sets';
import {Activity} from '../../classes/state.interface';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {Router} from '@angular/router';
import {SetClass} from '../../classes/set.class';
import {CommonService} from '../../classes/common.service';
import {OverlayEventDetail} from '@ionic/core';

@Component({
  selector: 'app-modal-sets',
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    DatePipe,
    ExHistory,
    MatButtonToggle,
    MatButtonToggleGroup,
    ShowSets
  ],
  templateUrl: './modal-sets.html',
  styleUrl: './modal-sets.scss'
})
export class ModalSets {
  service = inject(CommonService)
  activity =  input.required<Activity>();
  open = input.required<boolean>();
  closed = output<boolean>();
  reps: any;
  kgs: any;
  ngOnInit(): void {
    this.service.getHistory(this.activity().id);
  }
  addSet(reps: string, kgs: any) {
    this.service.startSessionIfNotStarted();
    if ( (!this.activity().hasSize && +reps > 0) || (this.activity().hasSize && +kgs > 0)) {
      if (this.activity().hasSize)
        this.activity().sets.push(new SetClass(reps, kgs));
      else
        this.activity().sets.push(new SetClass(reps, ""));
      this.service.save();
    }
  }

  async canDismiss(data?: undefined, role?: string) {
    return role !== 'gesture' ;//&& role !== 'backdrop';

  }
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.closed.emit(true);
  }
}
