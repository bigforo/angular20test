import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { IonCol, IonGrid, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { ActivityEx, CommonService } from '../../classes/common.service';
import { Activity } from '../../classes/state.interface';

@Component({
  selector: 'app-show-sets',
  imports: [DatePipe, IonCol, IonLabel, IonRow, IonGrid, IonText],
  templateUrl: './show-sets.html',
  styleUrl: './show-sets.scss',
})
export class ShowSets {
  actEx = input.required<ActivityEx>();
  service = inject(CommonService);

  activity = computed(() => {
    return this.actEx().activity;
  });
  protected readonly Activity = Activity;
}
