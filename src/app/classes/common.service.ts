import {Injectable} from '@angular/core';
import {StateInterface} from './state.interface';
import {DailyClass} from './daily.class';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public appState : StateInterface;

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

}
