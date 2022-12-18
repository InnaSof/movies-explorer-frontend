import { useState, useEffect, useCallback } from "react";

function useScreenWidth() {
  const getWidth = useCallback(() => window.innerWidth, []);
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    function resizeListener() {
      setWidth(getWidth());
    };

    window.addEventListener('resize', resizeController, false); // устанавливаем обработчик при монтировании

    let timerResize;

    function resizeController() {
      if (!timerResize) {
        timerResize = setTimeout(() => {
          timerResize = null;
          resizeListener();
        }, 1000);
      }
    };

    return () => window.removeEventListener('resize', resizeListener);  // убираем при размонтировании

  }, [getWidth]);

  return width;
}

export default useScreenWidth;
