/*
============================================
; Title:  auth.guard.ts
; Author: Ashleigh Lyman
; Date:   11 October 2020
; Modified By: Ashleigh Lyman
; Description: Auth guard component page
;===========================================
*/

//Import statements
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private cookieService: CookieService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
      const sessionUser = this.cookieService.get('session_user');

      if (sessionUser) {
        return true;
      } else {
        //navigate to signin page
        this.router.navigate(['/session/signin']);
        return false;
      }
    }
  }


