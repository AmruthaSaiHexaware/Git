import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import {UserContextGuard} from "./user-context/user-context.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cards-management',
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error-page/error-page.module').then((m) => m.ErrorPageModule),
  },
  {
    path: 'select-context',
    loadChildren: () =>
      import('./user-context/user-context.module').then(
        (m) => m.UserContextModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'cards-management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./cards-management/cards-management-bundle.module').then((m) => m.CardsManagementBundleModule),
  },
  {
    path: 'my-accounts',
    canActivate: [AuthGuard, UserContextGuard],
    loadChildren: () => import('./account-transaction/account-transaction-bundle.module').then((m) => m.AccountTransactionBundleModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./error-page/error-page.module').then((m) => m.ErrorPageModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
