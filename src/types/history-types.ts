import { GithubUserSummary } from "./github-types";

export type HistoryItem = {
  query: string;
  items: GithubUserSummary[];
  total: number;
};
