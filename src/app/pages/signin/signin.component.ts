/*
============================================
; Title:  signin.component.ts
; Author: Ashleigh Lyman
; Date:   27 September 2020
; Modified By: Ashleigh Lyman
; Description: Signin component page
;===========================================
*/


//Import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  //objects defined
    form: FormGroup;
    error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    //Grabs input on form and validates and verifies based on criteria required
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  //login function
  //Grabs form data and sets cookie service on user input
  login() {
    const empId = this.form.controls['empId'].value;
      this.http.get('/api/employees/' + empId).subscribe(res => {
        if (res) {
          this.cookieService.set('session_user', empId, 1);
          this.router.navigate(['/']);
        }else {
          this.error = 'The employee ID you entered is invalid. Please try again.';
        }
      })
  }
}
