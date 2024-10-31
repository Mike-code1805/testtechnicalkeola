import React, { createContext, useEffect, useReducer } from 'react';
import { globalReducer, globalState } from './globalReducer';
import { globalGetService } from '@/api';

type GlobalContextProps = {
  versionBundle: number;
};

const globalInicialState: globalState = {
  versionBundle: 0,
};

export const GlobalContext = createContext({} as GlobalContextProps);

export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(globalReducer, globalInicialState);

  useEffect(() => {
    (async () => {
      try {
        const response = await globalGetService();
        dispatch({
          type: 'setVersionBundle',
          payload: response.versionBundle ?? 1,
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    })();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
