import type { ReactiveControllerHost, ReactiveController } from 'lit';

export class MatchMediaController implements ReactiveController {
  // reference to the host element using this controller
  host: ReactiveControllerHost & Element;

  // the output value
  value = false;

  private mediaQuery: string;

  // todo: how to type this appropriately?
  //       for SSR we can't immediately initialize resizeObserver until
  //       hostConnected.
  private resizeObserver: any;

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
    this.resizeObserver.disconnect();
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