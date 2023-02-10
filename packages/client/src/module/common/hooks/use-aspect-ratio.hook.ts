import { useRef, useEffect, useState } from 'react';

const defaultWidth = 375; // width in px
const defaultHeight = 210; // height in px

const RATIO = defaultWidth / defaultHeight;

export const useAspectRatio = <T extends HTMLElement>(elem: T | null) => {
  const [height, setHeight] = useState<string>(`${defaultHeight}px`);

  const createResizeObserver = () =>
    new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        const heightToBeSet = width / RATIO;

        setHeight(`${Math.ceil(heightToBeSet)}px`);
      }
    });

  const resizeObserver = useRef<ResizeObserver>(createResizeObserver());

  useEffect(() => {
    if (elem) {
      resizeObserver.current.observe(elem);
    }

    return () => resizeObserver.current.disconnect();
  }, [elem]);

  return [height];
};
