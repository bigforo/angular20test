import {Component, Input} from '@angular/core';
import {ExerciseSetClass} from '../../classes/exercise-set.class';

@Component({
  selector: 'app-show-sets',
  imports: [],
  templateUrl: './show-sets.html',
  styleUrl: './show-sets.scss'
})
export class ShowSets {
  @Input() sets : ExerciseSetClass[] = [];
}
