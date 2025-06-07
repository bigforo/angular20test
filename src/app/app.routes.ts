import { Routes } from '@angular/router';
import { Tailwind } from './tailwind/tailwind';
import { MatTest } from './mat-test/mat-test';
import {List} from './list/list';

export const routes: Routes = [
  { path:'',component:MatTest },
  { path: 'tailwind', component: Tailwind },
  { path: 'list', component: List },
];
