import { Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SessionsList} from '../pages/sessions/sessions-list';
import { ActiveComponent} from '../pages/active/active';
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
        component:ActiveComponent,
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
