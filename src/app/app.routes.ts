import { Routes } from '@angular/router';
import { Tailwind } from './tailwind/tailwind';
import { MatTest } from './mat-test/mat-test';
import {List} from './list/list';

export const routes: Routes = [
  { path:'',component:List },
  { path: 'tailwind', component: Tailwind },
  { path: 'mat', component: MatTest },
];
