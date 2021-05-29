import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//* A SIMPLE TIMER USING STATE AND SET INTERVAL
const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect when count is zero
    count === 0 && history.push("/");
    //cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
