export interface LightDarkThemeColors {
  colorMain: string;
  colorBackgroundTabbar: string;
  colorBackgroundHeader: string;
  colorBackgroundScreen: string;
  colorBackgroundInput: string;
  colorPlaceholderText: string;
  colorBorderTextInput: string;
  colorBorderTextInputDisabled: string;
  colorBorderIconInput: string;
  colorBorderIconInputDisabled: string;
  colorBackgroundButtonDisabled: string;
  colorBackgroundButton: string;
  colorTextButton: string;
  colorTextButtonDisabled: string;
  title: string;
  subtitle: string;
  paragraph: string;
  input: string;
  caption: string;
}

export const lightThemeColors: LightDarkThemeColors = {
  colorMain: '#295F4E',
  colorBackgroundTabbar: '#6F93C2',
  colorBackgroundHeader: '#FFFFFF',
  colorBackgroundScreen: '#F3F5FE',
  colorBackgroundInput: '#FFFFFF',
  colorPlaceholderText: '#DDDDDD',
  colorBorderTextInput: '#FFFFFF',
  colorBorderTextInputDisabled: '#DDDDDD',
  colorBorderIconInput: '#295F4E',
  colorBorderIconInputDisabled: '#DDDDDD',
  colorBackgroundButtonDisabled: '#DDDDDD',
  colorBackgroundButton: '#6F93C2',
  colorTextButton: '#FFFFFF',
  colorTextButtonDisabled: '#F3F5FE',
  title: '#000000',
  subtitle: '#000000',
  paragraph: '#000000',
  input: '#000000',
  caption: '#000000',
};

export const darkThemeColors: LightDarkThemeColors = {
  colorMain: '#295F4E',
  colorBackgroundTabbar: '#6F93C2',
  colorBackgroundHeader: '#295F4E',
  colorBackgroundScreen: '#5D5D5E',
  colorBackgroundInput: '#151718',
  colorPlaceholderText: '#FFFFFF',
  colorBorderTextInput: '#295F4E',
  colorBorderTextInputDisabled: '#FFFFFF',
  colorBorderIconInput: '#295F4E',
  colorBorderIconInputDisabled: '#FFFFFF',
  colorBackgroundButtonDisabled: '#FFFFFF',
  colorBackgroundButton: '#6F93C2',
  colorTextButton: '#FFFFFF',
  colorTextButtonDisabled: '#5D5D5E',
  title: '#FFFFFF',
  subtitle: '#FFFFFF',
  paragraph: '#FFFFFF',
  input: '#FFFFFF',
  caption: '#FFFFFF',
};

export interface themeState {
  darkMode: 'light' | 'dark';
  colors: LightDarkThemeColors;
  fontSize: { title: number; subtitle: number; paragraph: number; input: number; caption: number };
  iconSize: { withText: number; withoutText: number };
}

type themeAction =
  | { type: 'setDarkMode'; payload: 'light' | 'dark' }
  | { type: 'setColors'; payload: LightDarkThemeColors }
  | { type: 'setStatusDasfh'; payload: 'checking' | 'success' | 'failed' }
  | { type: 'setStatusDash'; payload: 'checking' | 'success' | 'failed' }
  | { type: 'setStatusDasfh'; payload: 'checking' | 'success' | 'failed' };

export const themeReducer = (state: themeState, action: themeAction): themeState => {
  switch (action.type) {
    case 'setDarkMode':
      return { ...state, darkMode: action.payload };
    case 'setColors':
      return { ...state, colors: action.payload };
    default:
      return { ...state };
  }
};
