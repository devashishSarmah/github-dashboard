import { inject, Injectable } from "@angular/core";
import { API_ENDPOINT } from "../tokens";
import { Observable } from "rxjs";
import { SearchUsersResponse } from "../types/github-types";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  base = inject(API_ENDPOINT);
  http = inject(HttpClient);

  constructor() {}

  searchUsers(
    q: string,
    per_page = 10,
    page = 1
  ): Observable<SearchUsersResponse> {
    return this.http.get<SearchUsersResponse>(`${this.base}/search/users`, {
      params: { q, per_page, page },
    });
  }
}
