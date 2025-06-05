import { provideHttpClient } from "@angular/common/http";
import { API_ENDPOINT } from "./tokens";
import { provideRouter } from "@angular/router";
import { routes } from "./routes";

export const config = {
  providers: [
    {
      provide: API_ENDPOINT,
      useValue: "https://api.github.com",
    },
    provideHttpClient(),
    provideRouter(routes),
  ],
};
