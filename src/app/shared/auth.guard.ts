/*
============================================
; Title: auth.guard.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 19 August 2021
; Description: AuthGuard TS file
;===========================================
*/
// import statements
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  /**
   * Navigate to signin page if user cannot be authenticated
   * @param route
   * @param state
   * @returns
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get("session_user");
    if (sessionUser) {
      return true; // allow user to navigate
    } else {
      this.router.navigate(["/session/signin"]); // route to signin page
      return false;
    }
  }
}
