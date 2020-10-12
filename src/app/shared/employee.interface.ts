/*
============================================
; Title:  employee.interface.ts
; Author: Ashleigh Lyman
; Date:   11 October 2020
; Modified By: Ashleigh Lyman
; Description: Employee interface page
;===========================================
*/


//Import statements
import { Item } from './item.interface';


export interface Employee {

  empId: string;
  todo: Item[];
  done: Item[];
}
