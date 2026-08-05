import { Routes } from '@angular/router';
import { ActiveComponent } from './active/active';
import { SessionsList } from './sessions/sessions-list';
import { Main } from './start/main';
import { TabsPage } from './tabs-page';

export const TABS_ROUTES: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sessions',
        component: SessionsList,
      },
      {
        path: 'current',
        component: ActiveComponent,
      },
      {
        path: 'start',
        component: Main,
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
