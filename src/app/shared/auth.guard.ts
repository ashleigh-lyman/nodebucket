/*
============================================
; Title:  auth.guard.ts
; Author: Ashleigh Lyman
; Date:   27 September 2020
; Modified By: Ashleigh Lyman
; Description: Auth guard component page controls access on page
;===========================================
*/


//Import statements
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {

  }

  //If the data is false the user will be redirected back to the signin page
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
     {
       const sessionUser = this.cookieService.get('session_user');

       if (sessionUser) {

         return true;

       }  else {

          this.router.navigate(['/session/signin']);

          return false;
       }

    }

}
