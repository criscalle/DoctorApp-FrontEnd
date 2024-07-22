import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { UserService } from '../services/user.service';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin: FormGroup;
  hidePassword: boolean = true;
  showLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router, 
              private userService: UserService,
              private shared: SharedService){

this.formLogin = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required],
    });
 }

 iniciarsession(){
  this.showLoading = true;
  const request: Login = {
    UserName: this.formLogin.value.UserName,
    Password: this.formLogin.value.Password
  };
  this.userService.iniciarsesion(request).subscribe({
    next: (response) => {
      this.shared.saveSession(response);
      this.router.navigate(['layout']);
    },
    complete: () => {
      this.showLoading = false;
    },
    error: (error) => {
      this.shared.showAlert(error.error, 'Error!');
      this.showLoading = false;
    }
  })
 }

}
