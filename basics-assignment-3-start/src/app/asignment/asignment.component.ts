import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignment',
  templateUrl: './asignment.component.html',
  styleUrls: ['./asignment.component.css']
})
export class AsignmentComponent implements OnInit {

  showParagraph: boolean = false;
  clicksLog: any = [];
  clicksIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

  public onClickHandler() {
    this.showParagraph = !this.showParagraph;
    this.clicksIndex += 1;
    let ts = new Date();
    let msg = {
      index: this.clicksIndex,
      text: `Button clicked (${ts})`
    }
    this.clicksLog.push(msg);
  }

  public isGreaterThanFour(i) {
    return i > 4 ? '#778899' : 'transparent';
  }

}
