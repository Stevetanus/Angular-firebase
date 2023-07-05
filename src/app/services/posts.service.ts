import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "src/model/posts.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  baseUrl =
    "https://ng-https-request-default-rtdb.asia-southeast1.firebasedatabase.app";
  requirement = "posts.json";
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title,
      content,
    };
    // angular will take javascript object and automatically convert it into JSON
    this.http
      .post(
        `${this.baseUrl}/${this.requirement}`,
        postData
        //  {
        //   observe: "response",
        // }
      )
      .subscribe({
        // request is only sent when you subscribe
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log({ error });
          this.error.next(error.message);
        },
      });
  }

  fetchPosts() {
    let searchPararms = new HttpParams();
    searchPararms = searchPararms.append("print", "pretty");
    searchPararms = searchPararms.append("custom", "key");

    return this.http
      .get<{ [key: string]: Post }>(`${this.baseUrl}/${this.requirement}`, {
        headers: new HttpHeaders({ "Custom-Header": "Hello!" }),
        // params: new HttpParams().set("print", "pretty"),
        params: searchPararms,
      })
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError((errorRes) => {
          this.error.next(errorRes.message);
          return throwError(errorRes);
        })
      );
  }

  clearPosts() {
    return this.http
      .delete(`${this.baseUrl}/${this.requirement}`, {
        observe: "events",
        // default responseType is 'json'
        // responseType: 'text'
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
