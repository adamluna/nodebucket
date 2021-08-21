/*
============================================
; Title: auth.guard.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 19 August 2021
; Description: AuthGuard TS file
;===========================================
*/
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
   * code comments here
   * @param route
   * @param state
   * @returns
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get("session_user");
    if (sessionUser) {
      return true; // code comments here
    } else {
      this.router.navigate(["/session/signin"]);
      return false;
    }
  }
}
