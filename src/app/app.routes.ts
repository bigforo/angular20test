import { Routes } from '@angular/router';
import {ShowExercise} from './pages/page-show-exercise/show-exercise';
import { Main } from './pages/page-main/main';
import { Summary } from './pages/page-daily/summary';
import { PageAll } from './pages/page-all/pageAll';
import {PageShare} from './pages/page-share/page-share';
import {PageImport} from './pages/page-view/page-import';
import {View} from './pages/page-all/view/view';
import {PageImportExport} from './pages/page-import-export/page-import-export';

export const routes: Routes = [
  { path: '', redirectTo: '/app/tabs/start', pathMatch: 'full',},
  // { path: 'current', component: Summary },
  // { path: 'all', component: PageAll },
  { path: 'share', component: PageShare },
  { path: 'view', component: PageImport },
  { path: 'session', component: View },
  { path: 'import', component: PageImportExport },
  {
    path: 'app',
    loadChildren: () =>
      import('./tabs-page/routes').then(m => m.TABS_ROUTES),
  },
  {
    path: ':id',
    component: ShowExercise,
    children: [{ path: '**', redirectTo: '' }],
  },

];
