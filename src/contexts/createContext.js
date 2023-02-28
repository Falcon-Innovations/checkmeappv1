import React, { useReducer, useMemo } from 'react';
import useSafeDispatch from '../hooks/useSafeDispatch';

/**
 * @param {object} defaultValue
 * @param {function} reducer
 * @param {object} actions
 * @returns {object} context,provider
 *
 */

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const safeDispatch = useSafeDispatch(dispatch);

    const boundActions = {};

    Object.keys(actions).forEach((key) => {
      boundActions[key] = actions[key](safeDispatch);
    });

    // for (const key in actions) {
    //   boundActions[key] = actions[key](safeDispatch);
    // }
    const value = useMemo(() => ({ state, ...boundActions }), []);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  return { Context, Provider };
};
