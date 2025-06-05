import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { userSearchStore } from "../../stores/github-store";
import { Pagination } from "../../elements/pagination/pagination";
import { UserProfileCard } from "../../elements/user-profile-card/user-profile-card";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "app-home",
  imports: [FormsModule, Pagination, UserProfileCard, NgTemplateOutlet],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
  providers: [userSearchStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  query = model("");
  githubStore = inject(userSearchStore);

  search() {
    const query = this.query();
    if (query.length > 0) {
      this.githubStore.searchUsers({
        filter: { query },
        pagination: { page: 1, per_page: 12 },
      });
    }
  }

  onPageChange(page: number) {
    this.githubStore.searchUsers({
      filter: { query: this.githubStore.filter().query },
      pagination: { page, per_page: 12 },
    });
  }
}
