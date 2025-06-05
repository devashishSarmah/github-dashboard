import { Injectable } from "@angular/core";
import { HistoryItem } from "../types/history-types";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  constructor() {}

  save(historyItems: HistoryItem[]) {
    const historyJson = JSON.stringify(historyItems);
    localStorage.setItem("history", historyJson);
  }

  get(): HistoryItem[] {
    const historyJson = localStorage.getItem("history");
    if (!historyJson) {
      return [];
    }
    return JSON.parse(historyJson);
  }

  clear() {
    localStorage.removeItem("history");
  }
}
