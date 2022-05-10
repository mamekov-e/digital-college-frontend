import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public profileEditForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditUserComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      firstName: [
        this.data.user.firstName,
        Validators.compose([Validators.required])
      ],
      lastName: [
        this.data.user.lastName,
        Validators.compose([Validators.required])
      ],
      middleName: [
        this.data.user.middleName
      ],
      iin: [
        this.data.user.iin
      ],
      dob: [
        this.data.user.dob
      ],
      schoolName: [
        this.data.user.schoolName
      ],
      schoolCity: [
        this.data.user.schoolCity
      ],
      schoolState: [
        this.data.user.schoolState
      ],
      startDate: [
        this.data.user.startDate
      ],
      endDate: [
        this.data.user.endDate
      ]
    });
  }

  submit(): void {
    this.userService.updateUser(this.updateUser())
      .subscribe(() => {
        this.notificationService.showSnackBar('User updated successfully');
        this.dialogRef.close();
      });
  }

  private updateUser(): User {
    this.data.user.firstName = this.profileEditForm.value.firstName;
    this.data.user.lastName = this.profileEditForm.value.lastName;
    this.data.user.middleName = this.profileEditForm.value.middleName;
    this.data.user.iin = this.profileEditForm.value.iin;
    this.data.user.dob = this.profileEditForm.value.dob;
    this.data.user.schoolName = this.profileEditForm.value.schoolName;
    this.data.user.schoolCity = this.profileEditForm.value.schoolCity;
    this.data.user.schoolState = this.profileEditForm.value.schoolState;
    this.data.user.startDate = this.profileEditForm.value.startDate;
    this.data.user.endDate = this.profileEditForm.value.endDate;

    console.log(this.data)

    return this.data.user;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
