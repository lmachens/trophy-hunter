import Router from 'next/router';

const baseUrl = 'https://performance.machens.koeln/';

globalThis._paq = [
  ['setTrackerUrl', `${baseUrl}matomo.php`],
  ['setSiteId', '1'],
];

const scriptLoaded = new Promise((resolve) => {
  if (typeof document === 'undefined') {
    return resolve(true);
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `${baseUrl}matomo.js`;
  script.onload = resolve;
  document.body.append(script);
});

let isListeningRouteChangeComplete = false;
export const listenRouteChangeComplete = () => {
  if (isListeningRouteChangeComplete) {
    return;
  }
  isListeningRouteChangeComplete = true;
  Router.events.on('routeChangeComplete', (url) => {
    trackPageView(url);
  });
};

export const setUserId = async (id) => {
  globalThis._paq.push(['resetUserId']);
  globalThis._paq.push(['setUserId', id]);
  trackPageView(location.href);
};

export const trackPageView = async (url) => {
  await scriptLoaded;
  globalThis._paq.push(['setCustomUrl', url]);
  globalThis._paq.push(['setDocumentTitle', document.title]);
  globalThis._paq.push(['trackPageView']);
};

export const trackEvent = async (category, action, name) => {
  await scriptLoaded;
  globalThis._paq.push(['trackEvent', category, action, name]);
};

export const trackSettingsChanged = async (name) => {
  await trackEvent('Settings', 'Setting changed', name);
};

export const trackLink = async (url) => {
  await scriptLoaded;
  globalThis._paq.push(['trackLink', url, 'link']);
};

export const trackHotkey = async (name) => {
  await trackEvent('Settings', 'Hotkey used', name);
};

export const trackFilter = async (name) => {
  await trackEvent('Filter', 'Filter changed', name);
};

export const trackFavorite = async (name) => {
  await trackEvent('Favorite', 'Favorite changed', name);
};
