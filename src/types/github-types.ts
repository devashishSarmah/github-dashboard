export type GithubUserSummary = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type SearchUsersResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUserSummary[];
};
