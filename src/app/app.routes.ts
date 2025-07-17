import { Routes } from '@angular/router';
import { Tailwind } from './tailwind/tailwind';
import { MatTest } from './mat-test/mat-test';
import {List} from './list/list';
import { Tail2 } from './tail2/tail2';
import {Option4} from './main/option4/option4';
import { Main } from './main/main';

export const routes: Routes = [
  { path:'',component:Main },
  { path: '2', component: Tailwind },
  { path: '1', component: MatTest },
  { path: '3', component: List},
  { path: ':id', component: Option4,    children: [
      { path: '**', redirectTo: '' }
    ]},
];
