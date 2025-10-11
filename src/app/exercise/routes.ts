import { Routes } from '@angular/router';
import {ExerciseInfo} from './exercise-info/exercise-info';

export const EXERCISE_ROUTES: Routes = [
  { path: ':id', component: ExerciseInfo},
  { path: '', redirectTo: '/', pathMatch: 'full',},
];
