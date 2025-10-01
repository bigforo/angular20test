import {Component, input} from '@angular/core';
import {SetClass} from '../../../classes/set.class';
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
  sets = input<SetClass[]>([]) ;
  delete(set: SetClass) {
    this.sets().splice(this.sets().indexOf(set), 1);
  }
}
