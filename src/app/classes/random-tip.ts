import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomTip {

  private quotes = [
    { text: 'Click on the Exercise to add activity', number: 1 },
    { text: 'Swipe left to delete/remove Exercise', number: 2 },
    { text: 'The future belongs to those who believe in the beauty of their dreams.', number: 3 }
  ];

  constructor() { }
  sub = new BehaviorSubject<{ text: string, number: number }>(this.quotes[0]);
  public randomTip$ = this.sub.asObservable();
  getNewRandomTip() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.sub.next(this.quotes[randomIndex]);
  }
}
