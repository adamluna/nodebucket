/**
 * code attribution
*/
// import statements
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   * findAllTasks API calls the Node.js server URL /api/employees/:empId/tasks
   * @param empId
   * @returns 501 MongoDB Exception; 500 Server Exception; employee document with assigned task objects
   */
  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  /**
   * 
   * @param empId code comments
   * @param task 
   * @returns 
   */
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })
  }
}
