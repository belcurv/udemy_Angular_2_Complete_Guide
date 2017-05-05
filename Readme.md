## Udemy - Angular 2 The Complete Guide

### Section 1: Getting Started

**Install Angular CLI via NPM:**

`sudo npm install -g @angular/cli`

**Creating a new project**

`ng new {name of your new project}`

> Holy shit - it takes _forever_ to generate a new app.

Once the new app is finshed installing, start the server to make sure it all worked:

`ng serve`

That bundles the app using Webpack and starts a local server running on port 4200 (localhost:4200). This takes a while too.

**Editing our new project**

We can ignore most of the files/folders generated by `angular-cli`. We will work primarily in the `/src` folder.

`index.html` serves our SPA. We don't need to edit it at all - we'll work in `/src/app`.

**app.component.ts**
We build our Angular applications out of components.  The `app.component` is the one component we define that loads on initialpage load.

**ngModel is ... different**


`app.component.ts` looks like this:

```TypeScript
    import { Component } from '@angular/core';

    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
    export class AppComponent {
        name = '';
    }
```

See the `export class Appcomponent` bit? the `name` property (variable?) in there is bound to the view (like $scope does in Angular 1).  Then, in `app.component.html` we do:

```html
    <input type="text" [(ngModel)]="name">
    <p>{{ name }}</p>
```

The new view syntax for ngModel = `[(ngModel)]="bound-variable"`

**What hasn't changed?**

1.  Templates, DataBinding and Directives still exist.
2.  Services and Dependency still exist.
3.  Routing is still a thing.
4.  Pipes (for transforming template output) still exist

**What's new?**

1.  Observables

**Decorators**

Decorators make Angular 2 components _components_. Without them, they're nothing.

All components need exactly 1 template. Template is controlled by the TS code in our class.

```TypeScript
    @Component({
        selector: 'app-root',  // our new html element
        templateUrl: './app-root.component.html',  // our template file
        styleUrls: []          // this component's css
    })
```

**TypeScript**

More features than vanilla JS (e.g. Types, Classes, Interfaces, ...).

**Boostrapping**

`/src/main.ts` is run first and bootstraps our main module, AppModule:

```TypeScript
    import { enableProdMode } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

    import { AppModule } from './app/app.module';
    import { environment } from './environments/environment';

    if (environment.production) {
      enableProdMode();
    }

    platformBrowserDynamic().bootstrapModule(AppModule);
```

In the last line, the `bootstrapModule()` method is passed one argument: the `AppModule` imported in the 4th line from `./app/app.module.ts`.

Looking at `app.module.ts`, notice the `bootstrap: [AppComponent]` array in the decorator - this is where the circle closes: we reference our appComponent (`./app/app.component.ts`).

So it all works like this:

1.  `main.ts` loads first bootstrapping our main application, passing our `app.module.ts` module as an argument
2.  in `app.module.ts` we tell Angular to bootstrap our `appComponent` component.
3.  Angular loads `appComponent` which references a `app-root` selector, and
4.  now Angular can handle `app-root` in `index.html`, inserting `appComponent` in place of the directive.

#### Components

Key feature. We'll compose the whole application from components we'll create.

We start with our appComponent - the root component. On one hand it's a normal Angular component; on the other hand it's special because it's our root component.  We'll later add additional components to this one. Their selectors will not be added to our `index.html` file; instead they'll be added to `app/app.component.html`.

**A component is a TypsScript class**. Angular is able to instantiate it - to create objects based on this "blueprint".

When making our own components, we'll begin by naming and exporting it (because we need to _import_ it elsewhere):

```TypeScript
    export class ServerComponent {

    }
```

That's a normal TypeScript class, named "ServerComponent". But it doesn't do anything - it needs more information: a **decorator** tells Angular this is a component. We'll use the Component decorator, which we need to import before we can use:

```TypeScript
    import { Component } from '@angular/core'    // import Component from Angular core

    @Component({                                 // init Component, which takes a config object
        selector: 'app-server',                  // html element
        templateUrl: './server.component.html'   // template
    })
    export class ServerComponent {

    }
```

Before we can use this component, we need to update our `app.module.ts`. Angular uses components to build we pages, and uses modules to bundle pieces (components, etc) into packages. What does `appModule` do? It's a collection of our app's features. We need to register our new `app-server` component in `appModule` before we can use it. Add an `import` statement and include the component's name in the `declarations` property of NgModule's config object:

```TypeScript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpModule } from '@angular/http';

    import { AppComponent } from './app.component';
    import { ServerComponent } from './server/server.component';

    @NgModule({
        declarations: [
            AppComponent,
            ServerComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule { }
```

We can also create components with the CLI. Say we wanted our `app-server` component nested inside a `servers` component.

```
    ng generate component servers
```

(shorthand for the same)

```
    ng g c servers
```

The `generate` command creates all the files we need, namsepaced the proper way ('servers.component.ts'), in a folder named 'servers', AND updates `app.module.ts`.

**Inline Templates**

Components like `servers.component.ts` **need** to reference a template (just like Angular 1 directives). There are times when you can omit the selector, and you don't need to have styles - but **templates have to be present**.

The template can be either and external file or inline, and the sytax is the same as Angular 1: `template` vs `templateUrl`. We could re-write our `servers.component.ts` like this:

```TypeScript
    import { Component, OnInit } from '@angular/core';

    @Component({
      selector: 'app-servers',
      template: '<app-server></app-server><app-server></app-server>',
      styleUrls: ['./servers.component.css']
    })
    export class ServersComponent implements OnInit {

      constructor() { }

      ngOnInit() {
      }

    }
```

**Styling**

You can have only 1 template; you can have multiple stylesheets.

Since we are loading Bootstrap, we can just add CSS classes to the HTML in our templates:

```html
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h3>I'm in the App Component</h3>
                <hr>
                <app-servers></app-servers>
            </div>
        </div>
    </div>
```

But we also have this line in our `app.component.ts` @Component decorator:

```TypeScript
    styleUrls: ['./app.component.css']
```

That is an array of separate external stylesheets, all of which get applied to this component only. Edit `app.component.css` just like you would any normal CSS file.

You can also write _inline_ CSS using a `styles` property which takes an array of strings:

```TypeScript
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      // styleUrls: ['./app.component.css']
      styles: [`
        h3 {
            color: dodgerblue;
        }
      `]
    })
    export class AppComponent {

    }
```

**Selectors**

Just like in CSS, our Angular selectors can reference different DOM things. In our component.ts files, we can select by any of the following:

1.  an element:
    `selector: 'app-servers'`
2.  an element's attribute:
    `selector: '[app-servers]'`
3.  an elements class:
    `selector: '.app-servers'`

**BUT** selecting by ID will **NOT** work.

### Assignment 1
1.  Create 2 new components, one manually and one using the CLI: WarningAlter and SuccessAlert
2.  Output them beneath each other
3.  make sure they have some appropriate text
4.  Style the components appropriately, one inline and one w/external stylesheet


#### String Interpolation

One-way binding, from model to view, inside `{{ doubleCurlyBraces }}`. Anything that is a string or can be converted to a string can be used in string interpolation. A string, a number, or a method that returns a string. Ex:

```TypeScript
    export class ServerComponent {
        serverId: number = 10;            // converts to string
        serverStatus: string = 'offline'; // is a string

        getServerStatus() {
            return this.serverStatus;     // returns a string
        }
    }
```

Used in template like this:

```html
    <p>{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

#### Property Binding

We wrap a DOM attribute in `[square brackets]` to indicate to Angular that we're using **property binding**. That we want to dynamicaly bind some property. The property is bound to the value of some expression, which is wrapped in quotes (only! - no double curly braces!).  For ex:

```html
    <button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>
```

`[disabled]="!allowNewServer"` is a TypeScript expression!  Here, we are setting the `disabled` attribute depending on the value of `allowNewServer`, which is a value in our class:

```TypeScript
    export class ServersComponent implements OnInit {

        allowNewServer = false;   // starts 'false'

        constructor() {

            setTimeout( () => {
                this.allowNewServer = true;  // 'true' after 2 secs
                } , 2000)

        }

    }
```

#### Property Binding vs String Interpolation

String interpolation:

```html
    <p>{{ allowNewServer }}</p>
```

Property binding:

```html
    <p [innerText]="allowNewServer"></p>
```

When should you use one or the other? If you just want to output some text, use string interpolation. If you want to change some property of a HTML element, directive or component, use property binding.

Don't mix property binding and string interpolation.

#### Event Binding

`(parenthesis)` are the signal that we're using event binding.  You use parens with the event name inside, and then the code you want to execute inside "quotes":

```html
    <button class="btn btn-primary"
            [disabled]="!allowNewServer"
            (click)="onCreateServer()">
        Add Server
    </button>
```

How do you know to which Properties or Events of HTML Elements you may bind? You can basically bind to all Properties and Events - a good idea is to `console.log()` the element you're interested in to see which properties and events it offers.

**Important:** For events, you don't bind to `onclick` but only to `click` (=> (click)).

MDN offers nice lists of all properties and events of the element you're interested in. Googling for `YOUR_ELEMENT properties`  or `YOUR_ELEMENT events`  should yield nice results.

We can access DOM events using the reserved keyword `$event`:

```html
    <input type="text"
            class="form-control"
            (input)="onUpdateServerName($event)">
    <p>{{ serverName }}</p>
```

That says, on `(input)` fire `onUpdateServerName()` method, passing in the `$event` object.  Then we can access that event in a class method:

```TypeScript
    serverName = '';

    onUpdateServerName(event: Event) {
        this.serverName = (<HTMLInputElement>event.target).value;
    }
```

What's up with that `(<HTMLInputElement>event.target).value;`?  Why isn't it just `event.target.value;`?  We have to specifically **cast** this to type: Input Element. We tell TS that we know the type of the HTML element of this event is a HTML input element.

#### Two-Way Databinding

Two-way binding means `ngModel`. We wrap the HTML attribute in square brackets AND parenthesis, and set it equal to something (variable, etc) in our class. Looks like this:

```html
    <input type="text"
        class="form-control"
        [(ngModel)]="serverName">
    <p>{{ serverName }}</p>
```

Important: For Two-Way-Binding to work, you need to enable the `ngModel` directive. This is done by adding the `FormsModule` to the `imports[]` array in the AppModule.

You then also need to add the import from `@angular/forms` in the app.module.ts file:

```TypeScript
    import { FormsModule } from '@angular/forms';
```

#### Directives:

Directives are instruction in the DOM. Component selectors are also instructions in the DOM. "Angular please add out component in this place." Components are directives with templates. Directives are usually declared in the attribute style:

TypeScript:

```html
    <p appTurnGreen>Receives a green background!</p>
```

```TypeScript
    @Directive({
        selector: '[appTurnGreen]'
    })
    export class TurnGreenDirective {
        ...
    }
```

**Useful Built-in Directives**

Use **NgIf** to conditionally show content.

```html
    <p *ngIf="expression">Server was created, server name is {{ serverName }}</p>
```

The `*` is important. `*ngIf` is a _structural_ directive. Meaning it changes the structure of the DOM. `expression` must evaluate to `true` or `false`.

We can add `else` clauses too. The `else` content to show is wrapped in `<ng-template>` and 'tagged' with a **local reference** - a _marker_ starting with the `#`:

```html
    <p *ngIf="serverCreated; else noServer">Server was created, server is {{ serverName }}</p>
    <ng-template #noServer>
        <p>No server was created!</p>
    </ng-template>
```

### Constructor

>A constructor is just a built-in method that each class has, which is called when each component is created.

#### Styling Elements Dynamically with ngStyle

These look like normal html attributes without the `*`. Say we want to change the color of an element depending on the status of some variable. For example, depending on the `serverStatus`. We add the **ngStyle** property inline with our html. We use **property binding** with [square brackets] around the property name. `[ngStyle]` expects to get a JavaScript object:

```html
    <p [ngStyle]="{'background-color': getColor()}">{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

Add the method in our component class:

```TypeScript
    getColor() {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }
```

### Applying CSS Classes Dynamically with ngClass

`ngClass` allows us to dynamically add/remove CSS classes.  Like `ngStyle`, `ngClass` also only works as intended using property binding (wrap it in [square brackets]) and by giving it a JavaScript object. The object consists of key-values pairs. The keys are the CSS class names, the values are the conditions that determine whether the class should be attached or not.

```html
    <p [ngStyle]="{'background-color': getColor()}"
       [ngClass]="{online: serverStatus === 'online'}">
            {{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}
    </p>
```

### Outputting Lists with ngFor

`ngFor` loops over collections.

```html
    <app-server *ngFor="let server of servers"></app-server>
```

```TypeScript
    servers = ['Testserver', 'Testserver 2'];  // array of servers to ngFor loop over

    /* ... snip ... */

    onCreateServer() {
        this.serverCreated = true;
        this.servers.push(this.serverName);  // push new server to array
        this.serverCreationStatus = `Server was created! Name is ${this.serverName}`;
    }
```

## Planning our Project Application

We're going to build a Shopping List / Recipe Book application.  Our plan will look like this. Components, Features and Model (data):

```
                      Root Component
                            |
                     Header Component
                            |
              /------------------------------------\
             |                                     |
   Shopping List Feature                  Recipe Book Feature
             |                                     |
  Shopping List Component                   Recipe Component
             |                                     |
  Shopping List Component                Recipe List Component
             |                                     |
Shopping List Edit Component             Recipe Item Component
             |                                     |
      Ingredient Model                   Recipe Detail Component
                                                   |
                                              Recipe Model
```
