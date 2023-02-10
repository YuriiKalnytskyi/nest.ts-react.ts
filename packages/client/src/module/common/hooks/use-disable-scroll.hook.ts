import { useEffect } from 'react';

export const useDisableScroll = (condition?: boolean) => {
  const html = document.documentElement;
  const disableScroll = () => html?.classList.add('no-scroll');
  const enableScroll = () => html?.classList.remove('no-scroll');

  useEffect(() => {
    if (typeof condition === 'undefined') return;

    if (condition) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [condition]);

  return {
    enableScroll,
    disableScroll
  };
};
