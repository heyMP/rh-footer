import type { ReactiveControllerHost, ReactiveController } from 'lit';

export class MatchMediaController implements ReactiveController {
  // reference to the host element using this controller
  host: ReactiveControllerHost & Element;

  // the output value
  value = false;

  private mediaQuery: string;

  private resizeObserver?: ResizeObserver;

  constructor(host: ReactiveControllerHost & Element, mediaQuery: string = '') {
    (this.host = host).addController(this);
    this.mediaQuery = mediaQuery;
  }

  hostConnected() {
    this.resizeObserver = new ResizeObserver(this.evaluate.bind(this));

    if (this.host) {
      this.resizeObserver.observe(this.host);
    }
  }

  hostDisconnected() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  evaluate() {
    // use matchMedia to evaluate if the current media query is a match.
    const value = window.matchMedia(this.mediaQuery).matches;
    // dirty check value to determine to update or not
    if (this.value !== value) {
      this.value = value;
      // request a render update
      this.host.requestUpdate();
    }
  }
}
