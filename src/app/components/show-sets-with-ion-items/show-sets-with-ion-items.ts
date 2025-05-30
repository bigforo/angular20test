import {Component, inject, input} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {Activity} from '../../classes/state.interface';
import {DatePipe} from '@angular/common';
import {IonItem, IonLabel} from '@ionic/angular/standalone';

@Component({
  selector: 'app-show-sets-with-ion-items',
  imports: [
    DatePipe,
    IonItem,
    IonLabel
  ],
  templateUrl: './show-sets-with-ion-items.html',
  styleUrl: './show-sets-with-ion-items.scss'
})
export class ShowSetsWithIonItems {
  activity = input.required<Activity>();
  service = inject(CommonService);
  protected readonly Activity = Activity;
}
