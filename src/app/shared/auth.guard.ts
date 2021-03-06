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
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private cookieService: CookieService) {

    }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

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


