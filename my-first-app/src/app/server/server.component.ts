import { Component } from '@angular/core';   // import Component from Angular core

@Component({                                 // init Component, which takes a config object
    selector: 'app-server',                  // html element
    templateUrl: './server.component.html',  // template
    styles: [`
        .online {
            color: white;
        }
    `]
})
export class ServerComponent {
    serverId: number = 10;
    serverStatus: string = 'offline';
    
    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getServerStatus() {
        return this.serverStatus;
    }
    
    getColor() {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }
}
