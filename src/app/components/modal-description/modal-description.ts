import {Component, inject, input, model, output} from '@angular/core';
import {IonButton,IonButtons,IonContent,IonHeader,IonModal, IonTextarea, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {FormsModule} from '@angular/forms';
import {OverlayEventDetail} from '@ionic/core';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-modal-description',
  imports: [IonButton,IonButtons,IonContent,IonHeader,IonModal,IonTitle, IonToolbar,IonTextarea, FormsModule],
  template: `
    <ion-modal [isOpen]="open()" [canDismiss]="canDismiss" (willDismiss)="onWillDismiss($event)"
               [initialBreakpoint]="1" [breakpoints]="[0, 0.75, 1]" >
      <ng-template>

        <ion-header>
          <ion-toolbar>
            <ion-title>Session/Workout Notes</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="open.set(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

          <ion-textarea mode="md"
                        (ionChange)="change($event)"
                        [value]="appState().current?.note"
                        label="Session/Workout Notes"
                        label-placement="floating" fill="outline"
                        rows="10">
          </ion-textarea>

        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  styles: ''
})
export class ModalDescription {
  service = inject(CommonService);
  appState = this.service.appState;
  open = model.required<boolean>();
  async canDismiss(data?: undefined, role?: string) {
    return role !== 'gesture';// && role !== 'backdrop';
  }
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.open.update(()=>false);
  }
  change($event: any) {
    this.service.addNoteToCurrentSession($event.target.value);
  }
}
