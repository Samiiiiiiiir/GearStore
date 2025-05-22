import { useEffect } from 'react';

export const useToggleBodyClass = (
  classname: string,
  condition: boolean,
  deps: unknown[] = [],
) => {
  useEffect(() => {
    if (condition) {
      document.documentElement.classList.add(classname);
    } else {
      document.documentElement.classList.remove(classname);
    }

    return () => {
      document.documentElement.classList.remove(classname);
    };
  }, [classname, condition, ...deps]);
};
