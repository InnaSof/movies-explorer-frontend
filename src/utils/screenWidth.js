import { useState, useEffect, useCallback } from "react";

function useScreenWidth() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    };

    window.addEventListener('resize', resizeController, false);

    let timer;

    function resizeController() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleScreenResize();
        }, 1000);
      }
    };

    return () => window.removeEventListener('resize', handleScreenResize);

  }, [getScreenWidth]);

  return screenWidth;
}

export default useScreenWidth;
