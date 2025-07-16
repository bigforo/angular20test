import { Injectable } from '@angular/core';
import {StateInterface} from './state.interface';
import {DailyClass} from './daily.class';
import {ExerciseClass} from './exercise.class';

@Injectable({
  providedIn: 'root'
})
export class Common {

  public exercises = [
    { id: "ex01", name: "bench-flat" },
    { id: "ex02", name: "bench-incline" },
    { id: "ex03", name: "bench-dumbbells-incline" },
    { id: "ex04", name: "back-pull-down" },
    { id: "ex05", name: "back-pull-up" },
    { id: "ex06", name: "back-row-dumbbell" },
    { id: "ex07", name: "back-row-machine" },
    { id: "ex08", name: "dips-wide-row-dumbbell" },

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

  public saveExercise(exercise:ExerciseClass) {
    let a = this.appState.daily.exercises.find(a=>a.name == exercise.name);
    if (a) {
      a = exercise;
    }
    else {
      this.appState.daily.addExercise2(exercise);
    }
    console.log("state",this.appState);
  }
}
