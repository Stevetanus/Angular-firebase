import { Subscription } from "rxjs";
import { Component } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-counter",
  template: `
    <p>Counter!</p>
    <div>
      <button (click)="restart()">重新開始</button>
      <button (click)="add()">計數</button>
      <button (click)="onError()">錯誤</button>
      <button (click)="complete()">完成</button>
    </div>
    <p>目前狀態：{{ status }}</p>
    <p>目前計數：{{ counter }}</p>
    <p>偶數計數：{{ evenNum }}</p>
  `,
  styles: [],
})
export class CounterComponent {
  count$ = new Subject<number>();

  status!: string;

  counter = 0;

  evenNum = 0;

  statusSub!: Subscription;

  ngOnInit(): void {
    this.statusSub = this.count$.subscribe({
      next: (res: number) => {
        this.status = "計數中";
        this.counter += res;
        if (this.counter % 2 === 0) {
          this.evenNum = this.counter;
        }
      },
      error: (err) => {
        (this.status = "error"), alert(err);
      },
      complete: () => {
        (this.status = "完成計數"), (this.counter = 0);
        this.evenNum = 0;
      },
    });
    this.count$.next(0);
  }

  restart() {
    if (this.statusSub) this.statusSub.unsubscribe();
    this.counter = 0;
    this.evenNum = 0;
    this.count$ = new Subject<number>();
    this.statusSub = this.count$.subscribe({
      next: (res: number) => {
        this.status = "計數中";
        this.counter += res;
        if (this.counter % 2 === 0) {
          this.evenNum = this.counter;
        }
      },
      error: (err) => {
        (this.status = "error"), alert(err);
      },
      complete: () => {
        (this.status = "完成計數"), (this.counter = 0);
        this.evenNum = 0;
      },
    });
    this.count$.next(0);
  }

  add() {
    this.count$.next(1);
  }

  onError() {
    const reason = prompt("Enter error msg: ");
    this.count$.error(reason);
  }

  complete() {
    this.count$.complete();
  }
}
