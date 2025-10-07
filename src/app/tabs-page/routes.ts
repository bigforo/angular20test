import { Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import {PageAll} from '../pages/page-all/pageAll';
import {Summary} from '../pages/page-daily/summary';
import {Main} from '../pages/page-main/main';

export const TABS_ROUTES: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        component:PageAll,
      },
      {
        path: 'speakers',
        component:Summary,
      },
      {
        path: 'map',
        component:Main,
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            component:PageAll,
          },
        ],
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full',
      },
    ],
  },
];
