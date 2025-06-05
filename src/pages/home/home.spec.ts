import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Home } from "./home";
import { config } from "../../config";
import { userSearchStore } from "../../stores/github-store";
import { ComponentRef, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("Home", () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let componentRef: ComponentRef<Home>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [...config.providers, userSearchStore],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    debugEl = fixture.debugElement;

    component.query.set("");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call search method when query has been typed and search button is clicked", () => {
    const searchSpy = jasmine.createSpy("search");
    component.search = searchSpy;
    component.query.set("angular");
    fixture.detectChanges();
    const searchButton = debugEl.query(By.css("#searchBtn"));
    searchButton.triggerEventHandler("click", null);
    expect(searchSpy).toHaveBeenCalled();
  });
});
