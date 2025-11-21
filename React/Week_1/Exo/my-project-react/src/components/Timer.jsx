import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container mt-5">
      <h1>Timer</h1>
      <p>Temps échoulé : {seconds} s</p>
      <hr />
    </div>
  );
};

export default Timer;
