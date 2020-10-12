/*
============================================
; Title:  task.service.ts
; Author: Ashleigh Lyman
; Date:   10 October 2020
; Modified By: Ashleigh Lyman
; Description: Task service component page
;===========================================
*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient) {}

   /*FindAllTasks*/

   findAllTasks(empId: string): Observable<any> {
     return this.http.get('/api/employees/' + empId + '/tasks')
   }

  /*CreateTask*/

  createTask(empId: string, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })
  }

  /*UpdateTask*/

  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }


  /*DeleteTask*/

  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }

}
