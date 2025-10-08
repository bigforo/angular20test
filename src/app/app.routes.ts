import { Routes } from '@angular/router';
import {ShowExercise} from './pages/page-show-exercise/show-exercise';
import {PageShare} from './pages/share/page-share';
import {ViewExternal} from './pages/view/view-external';
import {SessionDetails} from './pages/sessions/view/session-details';
import {PageImportExport} from './pages/import/page-import-export';

export const routes: Routes = [
  { path: '', redirectTo: '/app/tabs/current', pathMatch: 'full',},
  // { path: 'share', component: PageShare },
  { path: 'view', component: ViewExternal },
  { path: 'session', component: SessionDetails },
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
