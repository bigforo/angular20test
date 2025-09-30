import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {CommonService} from '../classes/common.service';
import { RouterLink } from '@angular/router';
import { NgClass} from '@angular/common';
import {allExercisesData} from '../classes/all-exercises.data';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-main',
  imports: [RouterLink, NgClass, MatButton],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Main {
  service = inject(CommonService);

  protected readonly Date = Date;

  formatTimeHHMMSS(date: Date): string {
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
  addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
  public getTime(){
    const now = new Date();
    return this.formatTimeHHMMSS(now);
  }
  public getTimeLater(){
    const now = new Date();
    return this.formatTimeHHMMSS(this.addMinutes(now, 30));
  }
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  public getDescForCal() : string{
    let exercises = this.service.appState.daily.exercises;
    let desc:string = "";
    exercises.forEach(exercise => {
      desc += exercise.name + '\r'
      exercise.sets.forEach(set => {
        if (exercise.hasWeight)
          desc += ' - ' + set.reps + 'x' + set.size + '\r'
        else
          desc += ' - ' + set.reps + '\r'
      })
    })
    return desc;
  }

  protected readonly allExercises = allExercisesData;
}
