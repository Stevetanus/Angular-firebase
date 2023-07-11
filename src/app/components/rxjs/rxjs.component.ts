import { Component } from "@angular/core";
import {
  connectable,
  from,
  fromEvent,
  interval,
  map,
  Observable,
  of,
  publish,
  timer,
  tap,
  filter,
  first,
  last,
  throttle,
  throttleTime,
  debounceTime,
  scan,
  switchMap,
  takeUntil,
  takeWhile,
  zip,
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

  timer = timer(5000);

  interval = interval(1000);

  mashup = of("anything", ["you", "want"], 25, true, { cool: "stuff" });

  m = Math.random();

  cold = new Observable((observer) => {
    observer.next(Math.random());
  });

  hot = new Observable((observer) => observer.next(this.m));

  hotPublish = this.cold.pipe(connectable);

  jsonString = '{ "type": "dog", "breed": "pug"}';
  apiCall = of(this.jsonString);

  names = of(
    "Steven",
    "Gabe",
    "Louis",
    "Jenny",
    "Anita",
    "Coco",
    "Eating",
    "Judy",
    "Erica"
  );

  hobbies = of(
    "swimming",
    "nice",
    "weird",
    "strong",
    "white",
    "afraid",
    "straightfoward",
    "unknown",
    "bouldering"
  );

  combo = zip(this.names, this.hobbies);

  numbers = of(3, 5, 7, 9, -1, 0, -4, -11);

  mouseEvents = fromEvent(document, "mousemove");

  ngAfterViewInit(): void {
    this.obserable.subscribe((val) => this.paragraph.push(val));
    this.clicks.subscribe((click) => console.log(click));
    this.obsvPromise.subscribe((result) => this.paragraph.push(result));
    this.timer.subscribe((done) => this.paragraph.push("ding!"));
    const subscription = this.interval.subscribe((int) =>
      this.paragraph.push(new Date().getSeconds())
    );
    setTimeout(() => {
      subscription.unsubscribe();
    }, 3000);
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
    this.apiCall.pipe(map((json) => JSON.parse(json))).subscribe((obj) => {
      console.log(obj);
      this.paragraph.push(obj.type);
      this.paragraph.push(obj.breed);
    });
    this.names
      .pipe(
        takeWhile((name) => name != "Anita"),
        tap((name) => this.paragraph.push(name)),
        map((name) => name.toUpperCase()),
        tap((name) => this.paragraph.push(name))
      )
      .subscribe({
        next: (name) => {
          console.log(name);
        },
        complete: () => {
          this.paragraph.push("I found Anita, Jenny is standing ahead.");
        },
      });

    this.combo.subscribe((res) => {
      this.paragraph.push(res);
    });

    this.numbers
      .pipe(
        // first()
        last()
        // filter((n) => n > 0)
      )
      .subscribe((num) => this.paragraph.push(num));

    this.mouseEvents
      .pipe(
        // throttleTime(1000),
        debounceTime(1000)
      )
      .subscribe((e) => console.log(e));

    this.clicks
      .pipe(
        map((e) => {
          return Math.round(Math.random() * 10);
        }),
        tap((num) => this.paragraph.push("Clicked score + " + num)),
        scan((highScore, score) => {
          return highScore + score;
        })
      )
      .subscribe((sum) => this.paragraph.push("Total score + " + sum));
    this.clicks
      .pipe(
        switchMap((click) => interval(500)),
        takeUntil(this.timer)
      )
      .subscribe({
        next: (i) => {
          this.paragraph.push(i);
        },
        complete: () => this.paragraph.push("complete!"),
      });
  }
}
