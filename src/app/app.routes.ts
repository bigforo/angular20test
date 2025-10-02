import { Routes } from '@angular/router';
import {ShowExercise} from './pages/page-show-exercise/show-exercise';
import { Main } from './pages/page-main/main';
import { Summary } from './pages/page-daily/summary';
import { PageAll } from './pages/page-all/pageAll';
import {PageShare} from './pages/page-share/page-share';
import {PageImport} from './pages/page-view/page-import';

export const routes: Routes = [
  { path:'',component:Main },
  { path: 'daily', component: Summary },
  { path: 'all', component: PageAll },
  { path: 'share', component: PageShare },
  { path: 'view',  component: PageImport },

  { path: ':id', component: ShowExercise,
    children: [
      { path: '**', redirectTo: '' }
    ]
  },
];
