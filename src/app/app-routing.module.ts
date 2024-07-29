import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent, 
    pathMatch: 'full'
  },
  {
    path: 'login', 
    component: LoginComponent, 
    pathMatch: 'full'
  },
  {
    path: 'layout',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) 
    // component: LayoutComponent, 
    // pathMatch: 'full'
  },
  {
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
