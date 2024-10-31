import React, { createContext, useReducer } from 'react';
import { actionBurguerReducer, actionBurguerState } from './actionBurguerReducer';

type ActionBurguerContextProps = {
  lastClicked: number;
  statusInternet: 'connected' | 'disconnected';
  setLastClicked: (lastClicked: number) => void;
  setStatusInternet: (statusInternet: 'connected' | 'disconnected') => void;
};

const authInicialState: actionBurguerState = {
  lastClicked: 0,
  statusInternet: 'connected',
};

export const ActionBurguerContext = createContext({} as ActionBurguerContextProps);

export const ActionBurguerProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(actionBurguerReducer, authInicialState);

  const setLastClicked = (lastClicked: number) => {
    dispatch({
      type: 'setLastClicked',
      payload: {
        lastClicked,
      },
    });
  };

  const setStatusInternet = (statusInternet: 'connected' | 'disconnected') => {
    dispatch({
      type: 'setStatusInternet',
      payload: {
        statusInternet,
      },
    });
  };

  return (
    <ActionBurguerContext.Provider
      value={{
        ...state,
        setLastClicked,
        setStatusInternet,
      }}
    >
      {children}
    </ActionBurguerContext.Provider>
  );
};
