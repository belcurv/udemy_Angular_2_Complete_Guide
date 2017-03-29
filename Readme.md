# Udemy - Angular 2 The Complete Guide

Angular CLI - get it via NPM:

`npm install -g @angular/cli`

*Creating a new project*

`ng new {name of your new project}`

> Holy shit - it takes _forever_ to generate a new app.

Once the new app is finshed installing, start the server to make sure it all worked:

`ng serve`

That bundles the app using Webpack and starts a local server running on port 4200 (localhost:4200).

### Decorators

Decorators make Angular 2 components _components_. Without them, they're nothing.

All components need exactly 1 template. Template is controlled by the TS code in our class.

```
@Component({
    selector: 'app-root',  // our new html element
    templateUrl: './app-root.component.html',  // our template file 
    styleUrls: []          // this component's css
})
```

`/src/main.ts` is run first and bootstraps our main module, AppComponent.