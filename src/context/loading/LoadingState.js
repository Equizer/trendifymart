import React, { useState } from "react";
import LoadingContext from "./LoadingContext";

const LoadingState = (props) => {
  const [loading, setLoading] = useState(true);

  

  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
      {props.children}
    </LoadingContext.Provider>
  )
}

export default LoadingState