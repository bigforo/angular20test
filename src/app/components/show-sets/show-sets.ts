import {Component, computed, inject, input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IonCol, IonGrid, IonLabel, IonRow, IonText} from "@ionic/angular/standalone";
import {Activity} from '../../classes/state.interface';
import {ActivityEx, CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-show-sets',
  imports: [
    DatePipe,
    IonCol,
    IonLabel,
    IonRow,
    IonGrid,
    IonText
],
  templateUrl: './show-sets.html',
  styleUrl: './show-sets.scss'
})
export class ShowSets {
  actEx = input.required<ActivityEx>();
  service = inject(CommonService);

  activity = computed(()=>{
    return this.actEx().activity;
  })
  protected readonly Activity = Activity;
}
