import { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(second, replace = false) {
    setMode(second)

    setHistory(prev => {
      if (replace){
        prev.pop();
      }
      prev.push(second);
      return prev;
    });
  };

  function back() {
    setHistory(prev => {
      if(prev.length <= 1) {
        return prev;
      }
      setMode(prev[prev.length-2]);
      return prev.slice(0, -1);
    });
  };

  return {
    mode,
    transition,
    back
  }
};