import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass} from '@angular/common';
import {allExercisesData} from '../../classes/all-exercises.data';

@Component({
  selector: 'app-main',
  imports: [RouterLink, NgClass],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  protected readonly allExercises = allExercisesData;
}
