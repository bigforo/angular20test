import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonService } from '../../classes/common.service';
import { Activity } from '../../classes/state.interface';

@Component({
  selector: 'app-show-sets-with-ion-items',
  imports: [DatePipe, IonItem, IonLabel],
  templateUrl: './show-sets-with-ion-items.html',
  styleUrl: './show-sets-with-ion-items.scss',
})
export class ShowSetsWithIonItems {
  activity = input.required<Activity>();
  service = inject(CommonService);
  protected readonly Activity = Activity;
}
