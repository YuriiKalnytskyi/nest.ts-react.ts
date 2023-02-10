import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IPortalProps } from '../../types';

const portalRoot = document.querySelector('#portal-root') as HTMLElement;

function Portal({ children }: IPortalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) elRef.current = document.createElement('div');

  useEffect(() => {
    const el = elRef.current!;
    portalRoot.appendChild(el);

    return () => {
      portalRoot.removeChild(el);
    };
  }, []);
  // ts-ignore
  return createPortal(children as any, elRef.current);
}

export default Portal;
