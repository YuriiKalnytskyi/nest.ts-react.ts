import { BROWSERS } from '../types';

export const useDetectBrowserType = () => {
  const isChrome = navigator.userAgent.indexOf(BROWSERS.CHROME) > -1;
  const isChromium = navigator.userAgent.indexOf(BROWSERS.CHROMIUM) > -1;

  const isSafariAgent = navigator.userAgent.indexOf(BROWSERS.SAFARI) > -1;

  const isSafari = isSafariAgent && (!isChrome || !isChromium); // !important this checking is oblogatori

  return {
    isChrome,
    isChromium,
    isSafari
  };
};
