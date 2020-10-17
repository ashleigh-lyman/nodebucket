/*
============================================
; Title:  home.component.ts
; Author: Ashleigh Lyman
; Date:   27 September 2020
; Modified By: Ashleigh Lyman
; Description: home component page
;===========================================
*/

/*Import statements*/
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../shared/task.service';
import { Item } from '../../shared/item.interface';
import { Employee } from './../../shared/employee.interface';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Item[];
  done: Item[];
  employee: Employee;

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server response from findAllTasks--');
      console.log(res);

      this.employee = res.data;
      console.log('--Employee Object--');
      console.log(this.employee);


    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('This is the complete function');
      console.log(this.todo);
      console.log(this.done);
    })

  }

  ngOnInit(): void {
  }

/*Event listener for drag and drop*/

  // tslint:disable-next-line: typedef
  drop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      /*updates order of array*/
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Reordered the list of task items.');

      this.updateTaskList(this.empId, this.todo, this.done);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log('Moved task item to the container');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  private updateTaskList(empId: string, todo: Item[], done: Item[]): void  {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
    })
  }
  /*Create task dialog box*/

  openCreateTaskDialog() {

    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;

        })
        }
      })
    }



/*Delete Task*/

deleteTask(taskId: string) {
  if (taskId) {
    console.log(`Task item: ${taskId} was deleted`);
    this.taskService.deleteTask(this.empId, taskId). subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }

}
}
