import {Component, input} from '@angular/core';
import {ExerciseSetClass} from '../../../classes/exercise-set.class';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-show-sets',
  imports: [
    MatIcon,
    MatIconButton,
    DatePipe
  ],
  templateUrl: './show-sets.html',
  styleUrl: './show-sets.scss'
})
export class ShowSets {
  sets = input<ExerciseSetClass[]>([]) ;
  delete(set: ExerciseSetClass) {
    this.sets().splice(this.sets().indexOf(set), 1);
  }
}
