import { useEffect } from 'react';

export const splitLoginStr = (str) => {
  const arr = str.split('/');
  return { username: arr[0], role: arr[1] };
};

export const useOutside = (ref, func) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func]);
};

/**
 * Component that alerts if you click outside of it
 */
