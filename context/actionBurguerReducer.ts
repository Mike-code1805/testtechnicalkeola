export interface actionBurguerState {
  lastClicked: number;
  statusInternet: 'connected' | 'disconnected';
}

type actionBurguerAction =
  | {
      type: 'setLastClicked';
      payload: { lastClicked: number };
    }
  | {
      type: 'setStatusInternet';
      payload: { statusInternet: 'connected' | 'disconnected' };
    };

export const actionBurguerReducer = (state: actionBurguerState, action: actionBurguerAction): actionBurguerState => {
  switch (action.type) {
    case 'setLastClicked':
      return {
        ...state,
        lastClicked: action.payload.lastClicked,
      };
    case 'setStatusInternet':
      return {
        ...state,
        statusInternet: action.payload.statusInternet,
      };
    default:
      return state;
  }
};
