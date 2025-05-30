import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, linkedSignal, signal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {MatButton} from '@angular/material/button';
import {LocalStorageService} from '../../classes/ls';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'page-share',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './page-share.html',
  styleUrl: './page-share.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PageShare {
  service = inject(CommonService);
  appState = this.service.appState;

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


  // public getDescForCal() : string{
  //   let exercises = this.appState().current?.activities;
  //   let desc:string = "";
  //   exercises?.forEach(exercise => {
  //     desc += exercise.exercise.name + '\r'
  //     exercise.sets.forEach(set => {
  //       if (exercise.hasSize)
  //         desc += ' - ' + set.reps + 'x' + set.size + '\r'
  //       else
  //         desc += ' - ' + set.reps + '\r'
  //     })
  //   })
  //   return desc;
  // }

  ls = inject(LocalStorageService);
  link = linkedSignal(()=>{
    return this.ls.getCompressed(this.appState().current) ?? "";
  });
}
