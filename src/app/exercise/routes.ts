import { Routes } from '@angular/router';
import { ShowExercise } from '../pages/page-show-exercise/show-exercise';
import { ExerciseInfo } from './exercise-info/exercise-info';

export const EXERCISE_ROUTES: Routes = [
  { path: ':id', component: ExerciseInfo },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

export const WORK_ROUTES: Routes = [
  { path: ':id', component: ShowExercise },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
