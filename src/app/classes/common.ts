import { Injectable } from '@angular/core';
import {StateInterface} from './state.interface';
import {DailyClass} from './daily.class';
import { ExerciseClass} from './exercise.class';

@Injectable({
  providedIn: 'root'
})
export class Common {

  //TODO make it ExerciseClass []
  public allExercises: ExerciseClass [] = [
    new ExerciseClass("bench machine","b1"),
    new ExerciseClass("bench bar","b2"),
    new ExerciseClass("bench dumbbells incline","b3"),
    new ExerciseClass("bench machine incline","b4"),
    new ExerciseClass("bench smith incline","b5"),
    new ExerciseClass("cables upper chest","c1"),
    new ExerciseClass("dips","dips", { hasWeight:false }),
    new ExerciseClass("abs bench decline","ab1",{ hasWeight:false}),
    new ExerciseClass("abs roller","ab2",{ hasWeight:false}),

    new ExerciseClass("pull-down wide grip","bk1", { color: "yellow" }),
    new ExerciseClass("rowing wide grip","bk2", { color: "yellow" }),
    new ExerciseClass("barbell rows","bk3", { color: "yellow" }),
    new ExerciseClass("land mine row","bk4", { color: "yellow" }),
    new ExerciseClass("pull-down close grip","bk5", { color: "yellow" }),
    new ExerciseClass("pull-ups. bicep side","bk6", { color: "yellow" }),

    new ExerciseClass("bicep bar","bi1", { color: "red" }),
    new ExerciseClass("bicep dumbbell","bi2", { color: "red" }),

    new ExerciseClass("push dumbbell","sh1", { color: "green" }),
    new ExerciseClass("push barbell","sh2", { color: "green" }),
    new ExerciseClass("push machine","sh3", { color: "green" }),
    new ExerciseClass("plate up/down","sh4", { color: "green" }),
    new ExerciseClass("side fly","sh5", { color: "green" }),
    new ExerciseClass("face pull","sh6", { color: "green" }),
    new ExerciseClass("rear delt fly machine","sh7", { color: "green" }),
    new ExerciseClass("shrugs","sh8", { color: "green" }),
  ]

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
