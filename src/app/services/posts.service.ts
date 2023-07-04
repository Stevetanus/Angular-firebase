import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "src/model/posts.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  baseUrl =
    "https://ng-https-request-default-rtdb.asia-southeast1.firebasedatabase.app";
  requirement = "posts.json";

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title,
      content,
    };
    // angular will take javascript object and automatically convert it into JSON
    this.http.post(`${this.baseUrl}/${this.requirement}`, postData).subscribe({
      // request is only sent when you subscribe
      next: (res) => {
        console.log(res);
      },
    });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(`${this.baseUrl}/${this.requirement}`)
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      );
  }

  clearPosts() {
    return this.http.delete(`${this.baseUrl}/${this.requirement}`);
  }
}
