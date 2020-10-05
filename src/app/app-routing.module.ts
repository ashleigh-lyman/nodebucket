/*
============================================
; Title:  app-routing.module.ts
; Author: Ashleigh Lyman
; Date:   27 September 2020
; Modified By: Ashleigh Lyman
; Description: App routing module component page
;===========================================
*/


//Import statements
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';



//Define Routes
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
  path: 'session',
  component: AuthLayoutComponent,
  children: [
    {
      path: 'signin',
      component: SigninComponent

    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
