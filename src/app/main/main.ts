import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Common } from '../classes/common';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Main {
  service = inject(Common);

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

  public getDescForCal(){
    let ex = this.service.appState.daily.exercises;
    let desc:string = "";
    ex.forEach(item => {
      desc += item.name + '\r'
      item.sets.forEach(set => {
        if (item.noKg?? false)
          desc += ' - ' + set.reps + '\r'
        else
          desc += ' - ' + set.reps + 'x' + set.size + '\r'
      })
    })
    return desc;
  }
}
