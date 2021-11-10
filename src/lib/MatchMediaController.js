export class MatchMediaController {
  // reference to the host element using this controller
  host;
  // the output value
  value = false;

  constructor(host, mediaQuery = '') {
    (this.host = host).addController(this);
    this.mediaQuery = mediaQuery;
  }
  hostConnected() {
    this.observer = new ResizeObserver(this.evaluate.bind(this));
    if (this.host) {
      this.observer.observe(this.host);
    }
  }
  hostDisconnected() {
    this.observer.disconnect();
  }
  evaluate() {
    // Start a timer when the host is connected
    this.value = window.matchMedia(this.mediaQuery).matches;
    // request a render update
    this.host.requestUpdate();
    console.log(`evaluate`, this.value);
  }
}