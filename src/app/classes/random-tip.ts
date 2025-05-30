import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomTip {

  private quotes = [
    { text: 'Click on the Exercise to add activity.', number: 1 },
    { text: 'Swipe left to delete/remove Exercise.', number: 2 },
    { text: 'The future belongs to those who believe in the beauty of their dreams.', number: 3 },
    { text: 'Don’t count the days, make the days count.', number: 4},
    { text: 'The body achieves what the mind believes.', number: 5},
    { text: 'When you feel like quitting, think about why you started.', number: 6},
    { text: 'Sweat is just fat crying.', number: 7},
    { text: 'It never gets easier, you just get stronger.', number: 8},
  ];

  constructor() { }
  sub = new BehaviorSubject<{ text: string, number: number }>(this.quotes[0]);
  public randomTip$ = this.sub.asObservable();
  inx = 0;
  getNewRandomTip() {
    // const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.inx = this.inx >= this.quotes.length-1 ? 0 : this.inx+1
    this.sub.next(this.quotes[this.inx]);
  }
}
