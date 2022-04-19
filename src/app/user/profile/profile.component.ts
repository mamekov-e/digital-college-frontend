import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false;
  user!: User;
  selectedFile!: File;
  userProfileImage!: File;
  previewImageURL: any;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe!( data => {
      console.log(data);
      this.user = data;
      this.isUserDataLoaded = true;
    });

    this.imageService.getUserImage()
      .subscribe(data => {
        this.userProfileImage = data.imageByte;
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = () => {
      this.previewImageURL = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();

    dialogUserEditConfig.width = "400px";
    dialogUserEditConfig.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void {
    console.log(this.previewImageURL);

    if (this.selectedFile != null) {
      this.imageService.uploadImage(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile Image updated successfully');
        });
    }
  }

}
