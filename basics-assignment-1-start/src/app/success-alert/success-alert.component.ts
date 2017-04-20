import { Component } from '@angular/core';

@Component({
    selector: 'app-success-alert',
    template: `<div><h3>Success</h3></div>`,
    styles: [`
        h3 {
            background-color: dodgerblue;
            color: white;
        }
    `]
})
export class AppSuccessComponent {
    
}
