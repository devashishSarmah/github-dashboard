import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { SearchUsersResponse } from "../types/github-types";
import { GithubService } from "../services/github-service";
import { inject } from "@angular/core";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { historyStore } from "./history-store";

type SearchUsersResponseState = {
  searchUserResponse: SearchUsersResponse | null;
  isLoading: boolean;
  error: any | null;
  filter: { query: string };
  pagination: { page: number; per_page: number };
};

type SearchParams = {
  filter: SearchUsersResponseState["filter"];
  pagination: SearchUsersResponseState["pagination"];
};

const initialState: SearchUsersResponseState = {
  searchUserResponse: null,
  isLoading: false,
  error: null,
  filter: { query: "" },
  pagination: { page: 1, per_page: 12 },
};

export const userSearchStore = signalStore(
  withState(initialState),
  withMethods(
    (
      store,
      githubService = inject(GithubService),
      globalHistoryStore = inject(historyStore)
    ) => ({
      searchUsers: rxMethod<SearchParams>(
        pipe(
          tap(({ filter, pagination }) =>
            patchState(store, { isLoading: true, filter, pagination })
          ),
          switchMap(({ filter, pagination }) =>
            githubService
              .searchUsers(filter.query, pagination.per_page, pagination.page)
              .pipe(
                tapResponse({
                  next: (response) => {
                    patchState(store, { searchUserResponse: response });
                    globalHistoryStore.add({
                      query: filter.query,
                      items: response.items.slice(0, 3),
                      total: response.total_count,
                    });
                  },
                  error: (error) => {
                    console.error("Error fetching users:", error);
                    patchState(store, { error: error });
                  },
                  finalize: () => patchState(store, { isLoading: false }),
                })
              )
          )
        )
      ),
    })
  )
);
