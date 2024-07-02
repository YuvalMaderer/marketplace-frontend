import React from "react";
import { useCountContext } from "../components/CountProvider";

function HomePage() {
  const { count, setCount } = useCountContext();

  return (
    <>
      <button onClick={() => setCount(count + 1)}> plus </button>
      <div>{count}</div>
    </>
  );
}

export default HomePage;
