import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonService } from '../../classes/common.service';
import { SetClass } from '../../classes/set.class';

@Component({
  selector: 'app-modal-show-sets',
  imports: [MatIcon, MatIconButton, DatePipe],
  template: `
    @for (set of sets(); track set) {
      <div class="ion-display-flex ion-align-items-center ion-justify-content-between">
        <div>{{ set.time | date: 'HH:mm:ss' }}</div>
        @if (set.size === '') {
          <div class="h1-text">{{ set.reps }}</div>
        } @else {
          <div class="h1-text">{{ set.reps }} x {{ set.size }}</div>
        }

        <button (click)="delete(set)" matIconButton>
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    }
  `,
  styles: `
    .h1-text {
      font-size: 2rem;
      font-weight: 300;
      line-height: 1.5;
    }
  `,
})
export class ModalShowSets {
  service = inject(CommonService);
  sets = input<SetClass[]>([]);
  delete(set: SetClass) {
    this.sets().splice(this.sets().indexOf(set), 1);
    this.service.save();
  }
}
