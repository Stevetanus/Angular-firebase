import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  BehaviorSubject,
  Subscription,
  combineLatest,
  forkJoin,
  fromEvent,
  interval,
  map,
  scan,
  startWith,
  switchMap,
  takeWhile,
} from "rxjs";

export interface Letter {
  letter: String;
  yPos: number;
}
export interface Letters {
  ltrs: Letter[];
  intrvl: number;
}
export interface State {
  score: number;
  letters: Letter[];
  level: number;
}

@Component({
  selector: "app-alphabet-invasion",
  template: ` <p>alphabet-invasion works!</p> `,
  styles: [],
})
export class AlphabetInvasionComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  randomLetter = () => {
    return String.fromCharCode(
      Math.random() * ("z".charCodeAt(0) - "a".charCodeAt(0)) +
        "a".charCodeAt(0)
    );
  };

  levelChangeThreshold = 20;
  speedAdjust = 50;
  endThreshold = 15;
  gameWidth = 30;
  gameSub!: Subscription;

  intervalSubject = new BehaviorSubject(600);

  letters$ = this.intervalSubject.pipe(
    switchMap((i) =>
      interval(i).pipe(
        scan<number, Letters>(
          (letters) => ({
            intrvl: i,
            ltrs: [
              {
                letter: this.randomLetter(),
                yPos: Math.floor(Math.random() * this.gameWidth),
              },
              ...letters.ltrs,
            ],
          }),
          { ltrs: [], intrvl: 0 }
        )
      )
    )
  );

  keys$ = fromEvent(this.document, "keydown").pipe(
    startWith({ key: "" }),
    map((e: any) => e.key)
  );

  renderGame = (state: State) => {
    (this.document.body.innerHTML = `Score: ${state.score}, Level: ${state.level} <br/>`),
      state.letters.forEach(
        (l) =>
          (this.document.body.innerHTML +=
            "&nbsp".repeat(l.yPos) + l.letter + "<br/>")
      ),
      (this.document.body.innerHTML +=
        "<br/>".repeat(this.endThreshold - state.letters.length - 1) +
        "-".repeat(this.gameWidth));
  };

  renderGameOver = () => (this.document.body.innerHTML += "<br/>GAME OVER!");
  noop = () => {};

  game$ = combineLatest([this.keys$, this.letters$]).pipe(
    scan<[string, Letters], State>(
      (state, [key, letters]) => (
        letters.ltrs[letters.ltrs.length - 1] &&
        letters.ltrs[letters.ltrs.length - 1].letter === key
          ? ((state.score = state.score + 1), letters.ltrs.pop())
          : this.noop,
        state.score > 0 && state.score % this.levelChangeThreshold === 0
          ? ((letters.ltrs = []),
            (state.level = state.level + 1),
            (state.score = state.score + 1),
            this.intervalSubject.next(letters.intrvl - this.speedAdjust))
          : this.noop,
        { score: state.score, letters: letters.ltrs, level: state.level }
      ),
      { score: 0, letters: [], level: 1 }
    ),
    takeWhile((state) => state.letters.length < this.endThreshold)
  );

  ngOnInit(): void {
    console.log("init", this.document);
    this.gameSub = this.game$.subscribe({
      next: (state) => {
        console.log({ state });
        this.renderGame(state);
      },
      error: (error) => {
        console.log("err", error);
        this.noop();
      },
      complete: () => {
        console.log("complete");
        this.renderGameOver();
      },
    });
  }

  ngOnDestroy(): void {
    this.gameSub.unsubscribe();
  }
}
