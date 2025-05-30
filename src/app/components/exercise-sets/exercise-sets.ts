import {Component, inject, input, linkedSignal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IonCol, IonGrid, IonPicker, IonPickerColumn, IonPickerColumnOption, IonRow} from "@ionic/angular/standalone";
import {Activity, repeatOptions, weightOptions1} from '../../classes/state.interface';
import {EXERCISES} from '../../classes/all-exercises.data';
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-exercise-sets',
  imports: [
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption
  ],
  templateUrl: './exercise-sets.html',
  styleUrl: './exercise-sets.scss'
})
export class ExerciseSets {
  service = inject(CommonService)
  id = input<string>();
  protected readonly weightOptions1 = weightOptions1;
  protected readonly repeatOptions = repeatOptions;
}
