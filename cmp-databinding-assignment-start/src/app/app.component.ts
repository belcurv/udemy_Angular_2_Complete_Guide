import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public odds: number[] = [];
  public evens: number[] = [];

  public onCountChange(count: number) {

    console.log(count);

    if (count % 2 === 0) {
      this.evens.push(count);
    } else {
      this.odds.push(count);
    }
  }

}
