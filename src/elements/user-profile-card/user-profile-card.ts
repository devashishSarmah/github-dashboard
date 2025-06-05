import { NgOptimizedImage } from "@angular/common";
import { Component, input } from "@angular/core";
import { GithubUserSummary } from "../../types/github-types";

@Component({
  selector: "app-user-profile-card",
  imports: [NgOptimizedImage],
  templateUrl: "./user-profile-card.html",
  styleUrl: "./user-profile-card.css",
})
export class UserProfileCard {
  profile = input.required<GithubUserSummary>();
}
