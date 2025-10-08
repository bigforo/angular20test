import { Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SessionsList} from '../pages/sessions/sessions-list';
import { Summary} from '../pages/current/summary';
import { Main} from '../pages/start/main';

export const TABS_ROUTES: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sessions',
        component:SessionsList,
      },
      {
        path: 'current',
        component:Summary,
      },
      {
        path: 'start',
        component:Main,
      },
      {
        path: '',
        redirectTo: '/app/tabs/current',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/tabs/current',
    pathMatch: 'full',
  },

];
