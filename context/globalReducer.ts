export interface globalState {
  versionBundle: number;
}

type globalAction = {
  type: 'setVersionBundle';
  payload: number;
};

export const globalReducer = (state: globalState, action: globalAction): globalState => {
  switch (action.type) {
    case 'setVersionBundle':
      return { ...state, versionBundle: action.payload };

    default:
      return state;
  }
};
