import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {
  name = "Angular";
  position: number = 0;
  // @ts-ignore
  @ViewChild("first", {static: true}) first: ElementRef;
  // @ts-ignore
  @ViewChild("second", {static: true}) second: ElementRef;
  // @ts-ignore
  @ViewChild("third", {static: true}) third: ElementRef;
  // @ts-ignore
  @ViewChild("fourth", {static: true}) fourth: ElementRef;

  ngOnInit() {
    this.position = 1;
  }

  enter(n: number) {
    if (this.position < 5) {
      if (this.position === 1) {
        this.first.nativeElement.value = n;
      }
      if (this.position === 2) {
        this.second.nativeElement.value = n;
      }
      if (this.position === 3) {
        this.third.nativeElement.value = n;
      }
      if (this.position === 4) {
        this.fourth.nativeElement.value = n;
      }
      this.position++;
      console.log(
        "position is " +
        this.position +
        " " +
        "PIN is " +
        this.first.nativeElement.value +
        this.second.nativeElement.value +
        this.third.nativeElement.value +
        this.fourth.nativeElement.value
      );
    }
  }

  back() {
    if (this.position > 1) {
      this.position--;
      if (this.position === 1) {
        this.first.nativeElement.value = "";
      }
      if (this.position === 2) {
        this.second.nativeElement.value = "";
      }
      if (this.position === 3) {
        this.third.nativeElement.value = "";
      }
      if (this.position === 4) {
        this.fourth.nativeElement.value = "";
      }
      console.log(
        "position is " +
        this.position +
        " " +
        "PIN is " +
        this.first.nativeElement.value +
        this.second.nativeElement.value +
        this.third.nativeElement.value +
        this.fourth.nativeElement.value
      );
    }
  }

}
