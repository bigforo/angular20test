import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTest} from './mat-test/mat-test';
import {MatList, MatListItem} from '@angular/material/list';
import {Tailwind} from './tailwind/tailwind';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTest, Tailwind],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-test-20';
}
