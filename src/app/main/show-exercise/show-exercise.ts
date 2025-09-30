import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, linkedSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExerciseClass} from '../../classes/exercise.class';
import {ShowSets} from './show-sets/show-sets';
import 'add-to-calendar-button';
import {TruncatePipe} from '../../classes/truncate-pipe';
import {Common} from '../../classes/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {DatePipe, JsonPipe} from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-option4',
  imports: [
    ReactiveFormsModule,
    ShowSets,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButtonToggleGroup,
    RouterLink,
    DatePipe
  ],
  templateUrl: './show-exercise.html',
  styleUrl: './show-exercise.scss'
})
export class ShowExercise {
  service = inject(Common)

  id = input<string>();
  internalId = linkedSignal(() => {
    let id = this.id();
    let ex =
      this.service.allExercises.find(a=> a.id === id);
    // Create NEW EXERCISE
    if (ex) {
      let exercise =
        this.service.appState.daily.exercises.find(a => a === ex);
      if (!exercise) {
        this.service.appState.daily.exercises.push(ex);
      }

      this.exercise = ex;
      return ex.name;
    }
    return "UNKNOWN";
  });


  exercise: ExerciseClass = new ExerciseClass("exercise","");
  reps: any;
  kgs: any;
  constructor() {
  }
}
