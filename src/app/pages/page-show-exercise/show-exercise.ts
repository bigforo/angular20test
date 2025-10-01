import {Component, inject, input, linkedSignal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ExerciseClass} from '../../classes/exercise.class';
import {ShowSets} from './show-sets/show-sets';
import 'add-to-calendar-button';
import {CommonService} from '../../classes/common.service';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {DatePipe, JsonPipe} from '@angular/common';
import {allExercisesData} from '../../classes/all-exercises.data';


@Component({
  selector: 'app-option4',
  imports: [
    ReactiveFormsModule,
    ShowSets,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButtonToggleGroup,
    DatePipe
  ],
  templateUrl: './show-exercise.html',
  styleUrl: './show-exercise.scss'
})
export class ShowExercise {
  service = inject(CommonService)

  id = input<string>();
  internalId = linkedSignal(() => {
    let ex =
      allExercisesData.find(a=> a.id === this.id());
    if (!ex){
      return "UNKNOWN";
    }
    // Add exercise to daily
    let dailyExercise =
      this.service.appState.daily.exercises
        .find(dayExercise =>
          dayExercise.id === ex.id
          // &&
          // dayExercise.Date === ex?.Date
        );
    if (!dailyExercise) {
      dailyExercise = new ExerciseClass(ex.name,ex.id);
      this.service.appState.daily.exercises.push(dailyExercise);
    }
    this.exercise = dailyExercise as ExerciseClass;
    return dailyExercise.name;
  });


  exercise: ExerciseClass = new ExerciseClass("exercise","");
  reps: any;
  kgs: any;

  addSet(reps: string, kgs: any) {

    // if (this.exercise) {
    //   let ex =
    //     allExercisesData.find(a => a.id === this.id());
    //   if (ex) {
    //     // Add exercise to daily
    //     let exercise =
    //       this.service.appState.daily.exercises.find(a => a === ex);
    //     if (!exercise) {
    //       this.service.appState.daily.exercises.push(ex);
    //     }
    //     this.exercise = ex;
    //   }
    //   else {
    //     return;
    //   }
    // }

    if ( (!this.exercise.hasWeight && +reps > 0) || (this.exercise.hasWeight && +kgs > 0))
      this.exercise.addSet(reps,kgs)

    console.log(allExercisesData[1].sets)
  }
}
