/*
============================================
; Title: app.module.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 19 August 2021
; Description: App module TS file
;===========================================
*/

// import Item interface
import { Item } from "./item.interface";

// create Emplpoyee interface
export interface Employee {
    empId: string;
    todo: Item[];
    done: Item[];
}