import { Routes } from '@angular/router';
import { App } from './app';
import { Deployments } from './deployments/deployments';
import { Finances } from './finances/finances';
import { Assets } from './assets/assets';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'dashboard', component: Dashboard }, // ? maybe need this
  { path: 'deployments', component: Deployments },
  { path: 'finances', component: Finances },
  { path: 'assets', component: Assets },
];
