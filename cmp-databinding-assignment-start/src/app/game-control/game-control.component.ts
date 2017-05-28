import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  public gameRunning: boolean = false;
  public count: number = 0;

  private _setIntervalHandler: any;


  onStartGame() {
    this.gameRunning = true;
    this._setIntervalHandler = setInterval(() => {
      this.count += 1;
    }, 1000);
  }

  onStopGame() {
    this.gameRunning = false;
    clearInterval(this._setIntervalHandler);
  }

  constructor() { }

  ngOnInit() {
  }

}
