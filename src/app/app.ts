import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTest} from './mat-test/mat-test';
import {MatList, MatListItem} from '@angular/material/list';
import {Tailwind} from './tailwind/tailwind';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'gym.foro.mk';
}
