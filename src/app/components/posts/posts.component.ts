import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styles: [],
})
export class PostsComponent {
  posts$!: Observable<any[]>;
  postsEndpoints = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // hot observable multibroadcast, without shareReplay it would only be cold.
    this.posts$ = this.http.get<any[]>(this.postsEndpoints).pipe(shareReplay());
  }
}
