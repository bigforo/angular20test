import {Injectable} from '@angular/core';
import {StateInterface} from './state.interface';
import {DailyClass} from './daily.class';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public appState : StateInterface =  {
    daily:
      new DailyClass("daily"),
    weekly:[
      new DailyClass("Monday"),
      new DailyClass("Wednesday"),
      new DailyClass("Friday"),
    ]
  };

  constructor() {

  }
  static reset() {
    return {
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
