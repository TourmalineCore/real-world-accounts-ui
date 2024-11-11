import {
  useEffect, RefObject, useCallback,
} from 'react';

type Event = MouseEvent | TouchEvent;

export default function useOnClickOutside(refs: RefObject<HTMLElement>[], handler: (event: Event) => unknown) {
  const listener = useCallback((event: Event) => {
    if (refs.some((ref) => !ref.current)) {
      return;
    }

    // Do nothing if clicking ref's element or descendent elements
    if (refs.some((ref) => ref.current!.contains(event.target as Node))) {
      return;
    }

    handler(event);
  }, [refs, handler]);

  useEffect(
    () => {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    [refs, handler],
  );
}
