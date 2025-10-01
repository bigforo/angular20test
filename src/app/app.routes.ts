import { Routes } from '@angular/router';
import {ShowExercise} from './main/show-exercise/show-exercise';
import { Main } from './main/main';
import { Summary } from './main/summary/summary';
import { State } from './main/state/state';
import {Calendar} from './main/calendar/calendar';
import {Share} from './main/share/share';

export const routes: Routes = [
  { path:'',component:Main },
  { path: 'summary', component: Summary },
  { path: 'state', component: State },
  { path: 'calendar', component: Calendar },
  { path: 'share',  component: Share },

  { path: ':id', component: ShowExercise,
    children: [
      { path: '**', redirectTo: '' }
    ]
  },
];
