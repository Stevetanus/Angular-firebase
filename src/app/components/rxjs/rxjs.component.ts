import { Component } from "@angular/core";
import {
  connectable,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  publish,
  timer,
} from "rxjs";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: [],
})
export class RxjsComponent {
  paragraph: any[] = [];

  obserable = new Observable((observer) => {
    observer.next("hello");
    observer.next("world");
  });

  clicks = fromEvent(document, "click");

  promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("RESOLVED!");
    }, 1000);
  });

  obsvPromise = from(this.promise);

  timer = timer(1000);

  interval = interval(1000);

  mashup = of("anything", ["you", "want"], 25, true, { cool: "stuff" });

  m = Math.random();

  cold = new Observable((observer) => {
    observer.next(Math.random());
  });

  hot = new Observable((observer) => observer.next(this.m));

  hotPublish = this.cold.pipe(connectable);

  ngAfterViewInit(): void {
    this.obserable.subscribe((val) => this.paragraph.push(val));
    this.clicks.subscribe((click) => console.log(click));
    this.obsvPromise.subscribe((result) => this.paragraph.push(result));
    this.timer.subscribe((done) => this.paragraph.push("ding!"));
    this.interval.subscribe((int) =>
      this.paragraph.push(new Date().getSeconds())
    );
    this.mashup.subscribe((mashup) => this.paragraph.push(mashup));
    this.cold.subscribe((cold) => {
      this.paragraph.push(`cold1: ${cold}`);
    });
    this.cold.subscribe((cold) => {
      this.paragraph.push(`cold2: ${cold}`);
    });
    this.hot.subscribe((hot) => this.paragraph.push(`hot1: ${hot}`));
    this.hot.subscribe((hot) => this.paragraph.push(`hot2: ${hot}`));
    this.hotPublish.subscribe((hot) =>
      this.paragraph.push(`hotPublish1: ${hot}`)
    );
    this.hotPublish.subscribe((hot) =>
      this.paragraph.push(`hotPublish2: ${hot}`)
    );
  }
}
