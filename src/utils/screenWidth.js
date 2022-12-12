import { useState, useEffect, useCallback } from "react";

function useScreenWidth() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    };

    window.addEventListener('resize', resizeController, false); // устанавливаем обработчик при монтировании

    let timerResize;

    function resizeController() {
      if (!timerResize) {
        timerResize = setTimeout(() => {
          timerResize = null;
          handleScreenResize();
        }, 1000);
      }
    };

    return () => window.removeEventListener('resize', handleScreenResize);  // убираем при размонтировании

  }, [getScreenWidth]);

  return screenWidth;
}

export default useScreenWidth;
