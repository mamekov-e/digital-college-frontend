import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {FileUploadService} from "../../service/file-upload.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isAdmin = false;
  isUsersLoaded = false;
  usersAccepted!: User[];
  usersDeclined!: User[];
  usersUnchecked!: User[];
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  isUserDataLoaded = false;
  user!: User;

  constructor(private userService: UserService,
              private fileService: FileUploadService,
              private router: Router,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenService.getRole() === "ROLE_ADMIN") {
      this.isAdmin = true;
    }

    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  accept(userId: number) {
    console.log(userId);
    this.userService.changeUserStatus(userId, "accepted");
  }

  decline(userId: number) {
    console.log(userId);
    this.userService.changeUserStatus(userId, "declined");
  }

  acceptedList(): User[] {
    this.userService.getAllUsersAccepted()
      .subscribe(data => {
        this.usersAccepted = data;
        this.isUsersLoaded = true;
      });

    return this.usersAccepted;
  }

  declinedList(): User[] {
    this.userService.getAllUsersDeclined()
      .subscribe(data => {
        this.usersDeclined = data;
        this.isUsersLoaded = true;
      });

    return this.usersDeclined;
  }

  uncheckedList(): User[] {
    this.userService.getAllUsersUnchecked()
      .subscribe(data => {
        this.usersUnchecked = data;
        this.isUsersLoaded = true;
      });

    return this.usersUnchecked;
  }

  onDownloadFile(filename: string, userId: number): void {
    this.fileService.download(filename, userId).subscribe!(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}
