import ReactGA from "react-ga4";

const GA_ID = import.meta.env.VITE_GA_ID;

let initialized = false;

export function initAnalytics() {
  if (initialized || !GA_ID) return;
  ReactGA.initialize(GA_ID, {
    gaOptions: { anonymizeIp: true }
  });
  initialized = true;
}

export function trackPageview(path) {
  if (!initialized) return;
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent(category, action, label) {
  if (!initialized) return;
  ReactGA.event({ category, action, label });
}
