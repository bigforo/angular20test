import { Component, inject, input } from '@angular/core';
import { IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/angular/standalone';
import { CommonService } from '../../classes/common.service';
import { repeatOptions, weightOptions1 } from '../../classes/state.interface';

@Component({
  selector: 'app-exercise-sets',
  imports: [IonPicker, IonPickerColumn, IonPickerColumnOption],
  templateUrl: './exercise-sets.html',
  styleUrl: './exercise-sets.scss',
})
export class ExerciseSets {
  service = inject(CommonService);
  id = input<string>();
  protected readonly weightOptions1 = weightOptions1;
  protected readonly repeatOptions = repeatOptions;
}
