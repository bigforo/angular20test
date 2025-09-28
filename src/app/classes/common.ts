import { Injectable } from '@angular/core';
import {StateInterface} from './state.interface';
import {DailyClass} from './daily.class';
import {ExerciseClass} from './exercise.class';

@Injectable({
  providedIn: 'root'
})
export class Common {

  public exercises = [
    { id: "bench01", name: "bench-machine" },
    { id: "bench02", name: "bench-bar" },
    { id: "bench03", name: "bench-dumbbells-incline" },
    { id: "bench04", name: "bench-machine-incline" },
    { id: "bench05", name: "bench-smith-incline" },
    { id: "cables01", name: "cables-upper-chest" },
    { id: "dips", name: "dips" },
    { id: "abs01", name: "abs-bench-decline" },
    { id: "abs02", name: "abs-roller" },
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
    let a =
      this.appState.daily.exercises.find(a=>a.name == exercise.name);
    if (a) {
      a = exercise;
    }
    else {
      this.appState.daily.addExercise2(exercise);
    }
    console.log("state",this.appState);
  }
}
