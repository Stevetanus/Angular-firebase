import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription, map } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/model/posts.model";
import { AlertComponent } from "../alert/alert.component";
import { PlaceholderDirective } from "src/app/directives/placeholder.directive";

@Component({
  selector: "app-http",
  templateUrl: "./http.component.html",
  styles: [],
})
export class HttpComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    content: new FormControl("", Validators.required),
  });

  baseUrl =
    "https://ng-https-request-default-rtdb.asia-southeast1.firebasedatabase.app";
  requirement = "posts.json";

  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorMsg = "";
  private errorSub: Subscription = new Subscription();
  private closeSub: Subscription = new Subscription();
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;

  constructor(private http: HttpClient, private postS: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
    this.errorSub = this.postS.error.subscribe((errorMsg) => {
      console.log({ errorMsg });
      this.errorMsg = errorMsg;
    });
  }

  get title() {
    return this.postForm.get("title");
  }

  get content() {
    return this.postForm.get("content");
  }

  submit() {
    if (!this.postForm.valid) return;

    const { title, content } = this.postForm.value;
    this.postS.createAndStorePost(title as string, content as string);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.clearPosts();
  }

  onHandleError() {
    this.error = null;
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postS.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.error.error;
        this.showErrorAlert(error);
      },
    });
  }

  private clearPosts() {
    this.postS.clearPosts().subscribe({
      next: () => {
        this.loadedPosts = [];
      },
    });
  }

  private showErrorAlert(error: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef =
      hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);

    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
