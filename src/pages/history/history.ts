import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { historyStore } from "../../stores/history-store";
import { NgTemplateOutlet } from "@angular/common";
import { UserProfileCard } from "../../elements/user-profile-card/user-profile-card";

@Component({
  selector: "app-history",
  imports: [NgTemplateOutlet, UserProfileCard],
  templateUrl: "./history.html",
  styleUrl: "./history.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class History {
  globalHistoryStore = inject(historyStore);
}
