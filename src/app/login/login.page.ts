import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  myForm!: FormGroup;
  statusCode: number = 0;
  userNameErr: string = '';
  passwordErr: string = '';
  loginErr: string = '';
  isLoading: boolean = false;

  constructor(private loginService: UsersService, private router: Router) {
    localStorage.clear();
    this.isLoading = false;
    this.userNameErr = '';
    this.passwordErr = '';
    this.loginErr = '';
  }
  formInit() {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.formInit();
  }

  login() {
    this.isLoading = true;
    this.loginService.login(this.myForm.value).subscribe(
      (result) => {
        this.isLoading = false;
        this.statusCode = result.statusCode;
        if (this.statusCode == 200) {
          localStorage.setItem('username', result.data.username);
          localStorage.setItem('name', result.data.name);
          this.router.navigate(['home']);
        } else {
          console.log(result);
          this.userNameErr = result.errors?.username;
          this.passwordErr = result.errors?.password;
          this.loginErr = result.message;
        }
      },
      (err: HttpErrorResponse): void => {
        this.isLoading = false;
        this.statusCode = err.error.statusCode;
        if (this.statusCode == 500) {
          this.loginErr = err.error.message;
        } else {
          this.userNameErr = err.error.errors?.username;
          this.passwordErr = err.error.errors?.password;
          this.loginErr = err.error.error;
        }
      }
    );
  }
}
