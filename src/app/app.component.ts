import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Observable, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('scroll')
  scroll: ElementRef;

  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller
  ) {}

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
      'scroll'
      ).pipe(
        map(() => this.viewport.getScrollPosition()?.[1] > 0)
      );

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }

  ngAfterViewInit() { }

  ngAfterContentInit() {
    // this.scrollToTop();
    document.body.scrollTop = 0;
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);

  }

  scrollToTop() {
    const ScrollTop = 0;
    this.scroll.nativeElement.scrollTop = ScrollTop;
  }
}
