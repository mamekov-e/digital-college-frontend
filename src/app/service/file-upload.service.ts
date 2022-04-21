import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";

const FILE_API = "http://localhost:8080/api/file/"
const ATTESTATION = "attestation-scan"
const ID = "id-scan"

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadIdFile(file: File): Observable<any> {
    const  uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(FILE_API + "upload/" + ID, uploadData);
  }

  uploadAttestationFile(file: File): Observable<any> {
    const  uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(FILE_API + "upload/" + ATTESTATION, uploadData);
  }

  download(filename: string, userId: number): Observable<HttpEvent<Blob>> {
    return this.http.get(FILE_API + "download/" + filename + "/" + userId, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
}
