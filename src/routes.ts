import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home").then((c) => c.Home),
    pathMatch: "full",
  },
  {
    path: "history",
    loadComponent: () =>
      import("./pages/history/history").then((c) => c.History),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
