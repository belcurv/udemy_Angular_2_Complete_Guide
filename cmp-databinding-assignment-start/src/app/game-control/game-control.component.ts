import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  public gameRunning: boolean = false;
  public count: number = 0;

  // define and output our interval event emitter
  @Output() public intervalEvent = new EventEmitter<number>();

  private _setIntervalHandler: any;


  onStartGame() {
    this.gameRunning = true;
    this._setIntervalHandler = setInterval(() => {

      // increment count
      this.count += 1;

      // emit our event
      this.intervalEvent.emit(this.count);

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
