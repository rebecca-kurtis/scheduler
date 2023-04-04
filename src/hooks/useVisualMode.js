import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(second, replace = false) {
    setMode(second);

    setHistory((prev) => {
      const newHistory = [...prev];
      if (replace) {
        newHistory.pop();
      }
      newHistory.push(second);
      return newHistory;
    });
  }

  function back() {
    setHistory((prev) => {
      const newHistory = [...prev];
      if (newHistory.length <= 1) {
        console.log(newHistory)
        return newHistory;
      }
      setMode(newHistory[newHistory.length - 2]);
      return newHistory.slice(0, -1);
    });

  }

  return {
    mode,
    transition,
    back,
  };
}
