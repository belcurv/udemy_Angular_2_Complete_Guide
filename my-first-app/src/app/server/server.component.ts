import { Component } from '@angular/core';   // import Component from Angular core

@Component({                                 // init Component, which takes a config object
    selector: 'app-server',                  // html element
    templateUrl: './server.component.html'   // template
})
export class ServerComponent {
    serverId: number = 10;
    serverStatus: string = 'offline';

    getServerStatus() {
        return this.serverStatus;
    }
}
