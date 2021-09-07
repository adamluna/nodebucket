/*
============================================
; Title: task.service.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 25 August 2021
; Description: Task service TS file
;===========================================
*/
// import statements
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item.interface";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  /**
   * findAllTasks API calls the Node.js server URL /api/employees/:empId/tasks
   * @param empId
   * @returns 501 MongoDB Exception; 500 Server Exception; employee document with assigned task objects
   */
  findAllTasks(empId: number): Observable<any> {
    return this.http.get("/api/employees/" + empId + "/tasks");
  }

  /**
   * Create task
   * @param empId
   * @param task
   * @returns task information
   */
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post("/api/employees/" + empId + "/tasks", {
      text: task,
    });
  }

  /**
   * code comments
   * @param empId
   * @param todo
   * @param done
   * @returns
   */
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put("/api/employees/" + empId + "/tasks", {
      todo,
      done,
    });
  }

  /**
   *
   * @param empId code comments
   * @param taskId
   * @returns
   */
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete("/api/employees/" + empId + "/tasks/" + taskId);
  }
}
