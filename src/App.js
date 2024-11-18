import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const [time, setTime] = useState(0);
  const [incrementing, setIsIncrementing] = useState(true);
  const myTimer = useRef(null);

  useEffect(() => {
    myTimer.current = setInterval(() => {
      setTime((prev) => {
        if (incrementing) {
          if (prev < 10) {
            return prev + 1;
          } else {
            setIsIncrementing(false);
            return prev - 1; //this is important otherwise returns undefined will execute else's else line 24
          }
        } else {
          //not incrementing
          console.log('entered:::', { prev });
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(myTimer.current);
            return 0;
          }
        }
      });
    }, [1000]);

    return () => clearInterval(myTimer.current);
  }, [incrementing, time]);

  return <div>{time} Seconds</div>;
};

export default App;
