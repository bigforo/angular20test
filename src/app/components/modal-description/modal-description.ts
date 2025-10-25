import {Component, inject, input, output} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal, IonSearchbar, IonTextarea, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule} from '@angular/forms';
import {OverlayEventDetail} from '@ionic/core';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-modal-description',
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
    IonTextarea,
    FormsModule
  ],
  templateUrl: './modal-description.html',
  styleUrl: './modal-description.scss'
})
export class ModalDescription {
  service = inject(CommonService);
  appState = this.service.appState;
  open = input.required<boolean>();
  closed = output<boolean>();
  async canDismiss(data?: undefined, role?: string) {
    return role !== 'gesture';// && role !== 'backdrop';
  }
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.closed.emit(true);
  }
  change($event: any) {
    this.service.addNoteToCurrentSession($event.target.value);
  }
}
