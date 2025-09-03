import { createContext, useState } from "react";

export let counterContext = createContext();

export default function CounterContextProvider(props) {
  let [count, setCounter] = useState(null);

  return (
    <counterContext.Provider value={{ count, setCounter }}>
      {props.children}
    </counterContext.Provider>
  );
}
