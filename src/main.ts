import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { Header } from "./elements/header/header";
import { config } from "./config";

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <div class="container mx-auto pt-16 px-4">
      <router-outlet></router-outlet>
    </div>
  `,
  imports: [RouterOutlet, Header],
})
export class App {}

bootstrapApplication(App, config);
