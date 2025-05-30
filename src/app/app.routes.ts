import { Routes } from '@angular/router';
import {ShowExercise} from './pages/page-show-exercise/show-exercise';
import {ViewExternal} from './pages/shared-view/view-external';
import {SessionDetails} from './pages/session/session-details';
import {PageImportExport} from './pages/import/page-import-export';
import {SessionEdit} from './pages/session-edit/session-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/app/tabs/current', pathMatch: 'full',},
  // { path: 'share', component: PageShare },
  { path: 'view', component: ViewExternal },
  { path: 'session', component: SessionDetails },
  { path: 'session-edit', component: SessionEdit },
  { path: 'import', component: PageImportExport },
  { path: 'app', loadChildren: () => import('./tabs-page/routes').then(m => m.TABS_ROUTES)},
  { path: 'exercise', loadChildren: () => import('./exercise/routes').then(m => m.EXERCISE_ROUTES)},
  { path: 'work', loadChildren: () => import('./exercise/routes').then(m => m.WORK_ROUTES)},
  { path: ':id', component: ShowExercise, children: [{ path: '**', redirectTo: '/' }]},

];
