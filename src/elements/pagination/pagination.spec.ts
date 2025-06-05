import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Pagination } from "./pagination";
import { ComponentRef, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("Pagination", () => {
  let component: Pagination;
  let componentRef: ComponentRef<Pagination>;
  let fixture: ComponentFixture<Pagination>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagination],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    debugEl = fixture.debugElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("totalPages getter", () => {
    beforeEach(() => {
      componentRef.setInput("total", 0);
      componentRef.setInput("pageSize", 10);
      componentRef.setInput("currentPage", 1);
    });

    it("should return 1 when total < pageSize", () => {
      componentRef.setInput("total", 5);
      componentRef.setInput("pageSize", 10);

      expect(component.totalPages()).toBe(1);
    });

    it("should return 2 when total == pageSize + 1", () => {
      componentRef.setInput("total", 11);
      componentRef.setInput("pageSize", 10);
      expect(component.totalPages()).toBe(2);
    });

    it("should always be at least 1, even if total = 0", () => {
      componentRef.setInput("total", 0);
      componentRef.setInput("pageSize", 10);
      expect(component.totalPages()).toBe(1);
    });

    it("should compute correct pages when total is exact multiple", () => {
      componentRef.setInput("total", 100);
      componentRef.setInput("pageSize", 10);
      expect(component.totalPages()).toBe(10);
    });
  });

  describe("visiblePages logic", () => {
    beforeEach(() => {
      componentRef.setInput("total", 100);
      componentRef.setInput("pageSize", 10);
      componentRef.setInput("currentPage", 1);
    });

    it("should show [1] when totalPages = 1", () => {
      componentRef.setInput("total", 10);
      componentRef.setInput("pageSize", 10);
      expect(component.totalPages()).toBe(1);
      expect(component.visiblePages()).toEqual([1]);
    });

    it("should show [1, 2] when totalPages = 2 and currentPage = 1", () => {
      componentRef.setInput("total", 20);
      componentRef.setInput("currentPage", 1);
      expect(component.totalPages()).toBe(2);
      expect(component.visiblePages()).toEqual([1, 2]);
    });

    it("should show no ellipsis when pages are consecutive", () => {
      componentRef.setInput("total", 30);
      componentRef.setInput("currentPage", 2);
      expect(component.totalPages()).toBe(3);
      expect(component.visiblePages()).toEqual([1, 2, 3]);
    });
  });

  describe("template rendering", () => {
    beforeEach(() => {
      componentRef.setInput("total", 100);
      componentRef.setInput("pageSize", 10);
    });

    it("should render Prev and Next buttons always", () => {
      const prevbtn = debugEl.query(
        By.css("button:first-of-type")
      ).nativeElement;
      const nextbtn = debugEl.query(
        By.css("button:last-of-type")
      ).nativeElement;
      expect(prevbtn.textContent.trim()).toBe("Prev");
      expect(nextbtn.textContent.trim()).toBe("Next");
    });

    it("should disable Prev when currentPage = 1", () => {
      componentRef.setInput("currentPage", 1);
      fixture.detectChanges();
      const prevbtn = debugEl.query(
        By.css("button:first-of-type")
      ).nativeElement;
      expect(prevbtn.disabled).toBeTrue();
    });

    it("should disable Next when currentPage = totalPages", () => {
      componentRef.setInput("currentPage", component.totalPages());
      fixture.detectChanges();
      const nextbtn = debugEl.query(
        By.css("button:last-of-type")
      ).nativeElement;
      expect(nextbtn.disabled).toBeTrue();
    });
  });
});
