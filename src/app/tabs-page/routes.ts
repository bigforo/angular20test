import { Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SessionsList} from '../pages/history/sessions-list';
import { Summary} from '../pages/active/summary';
import { Main} from '../pages/old-start/main';

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
