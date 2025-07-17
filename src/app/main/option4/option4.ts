import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, linkedSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExerciseClass} from '../../classes/exercise.class';
import {ShowSets} from './show-sets/show-sets';
import 'add-to-calendar-button';
import {TruncatePipe} from '../../classes/truncate-pipe';
import {Common} from '../../classes/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-option4',
  imports: [
    ReactiveFormsModule,
    ShowSets,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButtonToggleGroup,
    RouterLink
],
  templateUrl: './option4.html',
  styleUrl: './option4.scss'
})
export class Option4 {
  service = inject(Common)
  // id = input.required<string>()
  // hero = computed(() => this.service.getHero(id));

  id = input<string|undefined>();
  internalId = linkedSignal(() => {
    let id = this.id();
    let ex_name = this.service.exercises.find(a=> a.id === id)?.name;
    if (ex_name) {
      let exercise = this.service.appState.daily.exercises.find(a => a.name === ex_name);
      if (!exercise) {
        this.service.appState.daily.addExercise(ex_name);
        exercise = this.service.appState.daily.exercises.find(a => a.name === ex_name);
      }
      this.exercise = exercise ?? new ExerciseClass(ex_name ?? "UNKNOWN");
      return ex_name;
    }
    return "UNKNOWN";
  });


  exercise: ExerciseClass = new ExerciseClass("exercise");
  reps: any;
  kgs: any;
  constructor() {
  }
}
