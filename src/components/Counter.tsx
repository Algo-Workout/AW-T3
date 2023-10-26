import React, { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <nav className="center flex items-center">
      <div className="flex items-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Counter : <span className="text-[hsl(280,100%,70%)]">{count}</span>{" "}
          waiting
        </h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </nav>
  );
};
