import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, input, linkedSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExerciseClass} from '../classes/exercise.class';
import {ShowSets} from './show-sets/show-sets';
import 'add-to-calendar-button';


@Component({
  selector: 'app-option4',
  imports: [
    ReactiveFormsModule,
    ShowSets,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './option4.html',
  styleUrl: './option4.scss'
})
export class Option4 {
  // id = input.required<string>()
  // hero = computed(() => this.service.getHero(id));

  id = input<string|undefined>();
  internalId = linkedSignal(() => this.id() ?? "UNKNOWN");



  exercises: ExerciseClass = new ExerciseClass("exercise");
  constructor() {

  }
}
