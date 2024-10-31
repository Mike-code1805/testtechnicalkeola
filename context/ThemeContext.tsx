import React, { createContext, useEffect, useReducer } from 'react';
import { LightDarkThemeColors, lightThemeColors, darkThemeColors, themeReducer, themeState } from './themeReducer';
import { Dimensions, useColorScheme } from 'react-native';

type ThemeContextProps = {
  darkMode: 'light' | 'dark';
  colors: LightDarkThemeColors;
  fontSize: { title: number; subtitle: number; paragraph: number; input: number; caption: number };
  iconSize: { withText: number; withoutText: number };
};

const themeInicialState: themeState = {
  darkMode: 'light',
  colors: lightThemeColors,
  fontSize: {
    title: Dimensions.get('screen').width > 500 ? 30 : 20,
    subtitle: Dimensions.get('screen').width > 500 ? 24 : 16,
    paragraph: Dimensions.get('screen').width > 500 ? 22.5 : 15,
    input: Dimensions.get('screen').width > 500 ? 22.5 : 15,
    caption: Dimensions.get('screen').width > 500 ? 19.5 : 13,
  },
  iconSize: { withText: Dimensions.get('screen').width > 500 ? 50 : 32, withoutText: Dimensions.get('screen').width > 500 ? 50 : 32 },
};

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(themeReducer, themeInicialState);
  const theme = useColorScheme() ?? 'light';

  useEffect(() => {
    const getThemeStore = async () => {
      dispatch({ type: 'setDarkMode', payload: theme ?? 'ligth' });
      dispatch({ type: 'setColors', payload: theme === 'dark' ? darkThemeColors : lightThemeColors });
    };
    getThemeStore();
  }, [theme]);

  return <ThemeContext.Provider value={{ ...state }}>{children}</ThemeContext.Provider>;
};
