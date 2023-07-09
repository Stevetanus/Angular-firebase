import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  // url = "http://localhost:3000/enroll";
  url =
    "https://ng-https-request-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json";

  constructor(private http: HttpClient) {}
  register(userData: any) {
    return this.http.post<any>(this.url, userData);
  }
}
