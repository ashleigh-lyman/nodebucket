/*
============================================
; Title:  create-task-dialog.component.ts
; Author: Ashleigh Lyman
; Date:   11 October 2020
; Modified By: Ashleigh Lyman
; Description: Create task dialog box component page
;===========================================
*/



import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder)  { }

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  createTask()  {
    this.dialogRef.close(this.taskForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
