import {Component, inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CommonService} from '../../classes/common.service';
import {MatButton} from '@angular/material/button';
import {LocalStorageService} from '../../classes/ls';
import {StateInterface} from '../../classes/state.interface';
import {DailyClass} from '../../classes/daily.class';
import {ExerciseClass, newExercise} from '../../classes/exercise.class';

@Component({
  selector: 'app-summary',
  imports: [
    DatePipe,
    RouterLink,
    MatButton
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService)
  ls = inject(LocalStorageService)

  save() {
    this.ls.setItem("gym-day",this.service.appState.daily.exercises);
  }
  load(){
    this.reset();
    let list = this.ls.getItem<ExerciseClass[]>("gym-day");
    list?.forEach(ex => {
      this.service.appState.daily.exercises.push(newExercise(ex));
    })

  }

  reset() {
    this.service.appState.daily = new DailyClass("daily");
  }
}
