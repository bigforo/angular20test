import {Component, signal} from '@angular/core';
import {MatActionList, MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {MatInput} from '@angular/material/input';
import {DailyClass} from '../classes/daily.class';
import {StateInterface} from '../classes/state.interface';

@Component({
  selector: 'app-mat-test',
  imports: [
    MatListItem,
    MatActionList,
    MatListItemTitle,
    MatListItemLine,
    MatList,
    MatInput,
  ],
  templateUrl: './mat-test.html',
  styleUrl: './mat-test.scss',
  // host:{ '[style.--mat-list-list-item-one-line-container-height]': '1' }
})
export class MatTest {

  appState : StateInterface;
  constructor() {
    this.appState = {
      daily:
        new DailyClass("daily"),
      weekly:[
        new DailyClass("Monday"),
        new DailyClass("Wednesday"),
        new DailyClass("Friday"),
      ]
    }
  }
  mainScreen = signal<boolean>(false);

  click($event: MouseEvent) {
    this.mainScreen.update(v=>!v);
  }
}





