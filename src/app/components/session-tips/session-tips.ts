import {Component, inject, OnInit} from '@angular/core';
import {IonItem, IonLabel, IonText} from '@ionic/angular/standalone';
import {RandomTip} from '../../classes/random-tip';
import {AsyncPipe} from '@angular/common';
import {delay} from 'rxjs';

@Component({
  selector: 'app-session-tips',
  imports: [
    IonLabel,
    AsyncPipe,
    IonItem,
    IonText
  ],
  templateUrl: './session-tips.html',
  styleUrl: './session-tips.scss'
})
export class SessionTips implements OnInit {
  ngOnInit(): void {
    this.randomTip.getNewRandomTip();
  }
  randomTip = inject(RandomTip);
  tip$ = this.randomTip.randomTip$.pipe(delay(1));

  click() {
    this.randomTip.getNewRandomTip();
  }
}
