/*
 ==================================
 ; Title: base-layout.component.ts
 ; Author: Professor Krasso
 ; Modified by: Adam Luna
 ; Date: 25 August 2021
 ; Description: base layout component TS file
 ================================== 
*/
// import statements
import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.css"],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  // get name of logged in user and log message to console
  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get("session_user") ? true : false;

    this.name = sessionStorage.getItem("name");
    console.log("Signed in as " + this.name);
  }

  ngOnInit(): void {}

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(["/session/signin"]);
  }
}
