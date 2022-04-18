import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      middleName: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    this.authService.register({
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      middleName: this.registerForm.value.middleName,
      phoneNumber: this.registerForm.value.phoneNumber,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe( data => {
      console.log(data);
      this.notificationService.showSnackBar("Successfully registered");
    }, error => {
      this.notificationService.showSnackBar(error.message);
    })
  }


}
