import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  
  const toggle = (param) => {
    setState((prevState) => {
      if (typeof param === 'boolean') {
        return param;
      }
      return !prevState;
    });
  };

  return [state, toggle];
};

export default useToggle;
