import { DatePipe } from '@angular/common';
import { Component, inject, input, linkedSignal, output } from '@angular/core';
import { IonCol, IonGrid, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { EXERCISES } from '../../classes/all-exercises.data';
import { CommonService } from '../../classes/common.service';

@Component({
  selector: 'app-ex-history',
  imports: [DatePipe, IonCol, IonGrid, IonRow, IonLabel, IonText],
  templateUrl: './ex-history.html',
  styleUrl: './ex-history.scss',
})
export class ExHistory {
  service = inject(CommonService);
  id = input<string>();
  clickToNavigate = output<number>();
  histActivities = linkedSignal(() => {
    const ex = EXERCISES.find((a) => a.id === this.id());
    if (ex) {
      return this.service.getAllHistoryByActivityIdExtended(ex.id as string);
    }
    return [];
  });

  checkSize(size: string) {
    if (size !== '') return ' x ' + size + ' kg';
    return '';
  }

  clickToNavigateToExerciseDetails(id: number) {
    this.clickToNavigate.emit(id);
  }
}
