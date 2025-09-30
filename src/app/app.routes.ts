import { Routes } from '@angular/router';
import { Tailwind } from './tailwind/tailwind';
import { MatTest } from './mat-test/mat-test';
import {List} from './list/list';
import { Tail2 } from './tail2/tail2';
import {ShowExercise} from './main/show-exercise/show-exercise';
import { Main } from './main/main';
import { Summary } from './main/summary/summary';
import { State } from './main/state/state';

export const routes: Routes = [
  { path:'',component:Main },
  // { path: '2', component: Tailwind },
  // { path: '1', component: MatTest },
  // { path: '3', component: List},
  { path: 'summary', component: Summary },
  { path: 'state', component: State },
  { path: ':id', component: ShowExercise,
    children: [
      { path: '**', redirectTo: '' }
    ]
  },

];
