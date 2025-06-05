import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { HistoryItem } from "../types/history-types";
import { inject } from "@angular/core";
import { HistoryService } from "../services/history-service";

type HistoryState = {
  history: HistoryItem[];
};

const initialState: HistoryState = {
  history: [],
};

export const historyStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, historyService = inject(HistoryService)) => ({
    add: (item: HistoryItem) => {
      const history = store.history();
      const newHistory = [item, ...history];
      patchState(store, { history: newHistory });
      historyService.save(newHistory);
    },
    clear: () => {
      patchState(store, { history: [] });
      historyService.clear();
    },
  })),
  withHooks({
    onInit: (store, historyService = inject(HistoryService)) => {
      const history = historyService.get();
      patchState(store, { history });
    },
  })
);
