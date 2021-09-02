/*
============================================
; Title: home.component.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 25 August 2021
; Description: Home component TS file
;===========================================
*/

// import statements
import { CreateTaskDialogComponent } from "./../../shared/create-task-dialog/create-task-dialog.component";
import { TaskService } from "./../../shared/services/task.service";
import { Component, OnInit } from "@angular/core";
import { Employee } from "../../shared/models/employee.interface";
import { Item } from "../../shared/models/item.interface";
import { CookieService } from "ngx-cookie-service";
import { MatDialog } from "@angular/material/dialog";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get("session_user"), 10);

    /**
     * make call to taskService funciton findAllTasks
     */
    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        console.log("--Server response from findAllTasks API--");
        console.log(res);

        this.employee = res; // take response from server and bind to employee object
        console.log("--Employee object--");
        console.log(this.employee);
      },
      (err) => {
        console.log("---Server error--");
        console.log(err);
      },
      () => {
        console.log("--onComplete of the findAllTasks service call--");

        this.todo = this.employee.todo;
        this.done = this.employee.done;

        console.log("--Todo tasks--");
        console.log(this.todo);

        console.log("--Done tasks--");
        console.log(this.done);
      }
    );
  }

  ngOnInit(): void {}

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log("--empId--");
      console.log(this.empId);

      console.log();
      if (data) {
        console.log("--Data Exists--");
        console.log(data);

        this.taskService.createTask(this.empId, data.text).subscribe(
          (res) => {
            console.log("--Inside createTask Result--");
            console.log(res);

            this.employee = res;
            console.log("--This.employee--");
            console.log(this.employee);
          },
          (err) => {
            console.log("--onError of the createTask service call--");
            console.log(err);
          },
          () => {
            console.log("--onComplete--");
            this.todo.push(this.employee.todo[0]);
            this.done.push(this.employee.done[0]);
            console.log(this.todo);
            console.log(this.done);
          }
        );
      }
    });
  }

  /**
   * move tasks in ToDo column to Done column using drag and drop functionality
   * @param event
   */
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log("Reordered the existing list of task items."); // log message to console when tasks are reordered

      this.updateTaskList(this.empId, this.todo, this.done);
    } else {
      // transferring items in the two arrays
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log("Moved task item into the other container."); // log message to console when tasks are moved into the other container

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  /**
   * Calls deleteTask API to delete tasks when user chooses to delete a task
   * @param taskId
   */
  deleteTask(taskId: string): void {
    // User is prompted to choose if they are sure they want to delete a task
    if (confirm("Are you sure you want to delete this task?")) {
      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);

        this.taskService.deleteTask(this.empId, taskId).subscribe(
          (res) => {
            this.employee = res.data;
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    }
  }

  /**
   * Calls updateTask API to update employee collection when tasks are dragged and dropped between the two columns
   * @param empId
   * @param todo
   * @param done
   */
  private updateTaskList(empId: number, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(this.empId, this.todo, this.done).subscribe(
      (res) => {
        this.employee = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    );
  }
}
