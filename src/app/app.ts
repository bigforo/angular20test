import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTest} from './mat-test/mat-test';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTest ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-test-20';
}
