import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";

@Component({
  selector: "app-pagination",
  imports: [],
  templateUrl: "./pagination.html",
  styleUrl: "./pagination.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {
  total = input.required<number>();
  pageSize = input<number>(10);
  currentPage = input<number>(1);
  pageChange = output<number>();

  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.total() / this.pageSize()));
  });

  visiblePages = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const delta = 2;

    const range = [];

    range.push(1);

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    const pages: (number | "...")[] = [];
    let prev: number | undefined = undefined;

    for (const page of range) {
      if (prev !== undefined) {
        const diff = page - prev;
        if (diff > 2) {
          pages.push("...");
        } else if (diff === 2) {
          pages.push(prev + 1);
        }
      }
      pages.push(page);
      prev = page;
    }

    return pages;
  });

  go(page: number) {
    this.pageChange.emit(page);
  }

  prev() {
    this.go(this.currentPage() - 1);
  }

  next() {
    this.go(this.currentPage() + 1);
  }
}
