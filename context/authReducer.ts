export interface authState {
  id: string;
  authToken: string;
  username: string;
  lastname: string;
  email: string;
  type_user: 'normal' | 'deliveryman' | 'admin' | 'none';
}

type authAction = {
  type: 'setIdAuthTokenUsername';
  payload: {
    id: string;
    authToken: string;
    username: string;
    lastname: string;
    email: string;
    type_user: 'normal' | 'deliveryman' | 'admin' | 'none';
  };
};

export const authReducer = (state: authState, action: authAction): authState => {
  switch (action.type) {
    case 'setIdAuthTokenUsername':
      return {
        ...state,
        id: action.payload.id,
        authToken: action.payload.authToken,
        username: action.payload.username,
        lastname: action.payload.lastname,
        email: action.payload.email,
        type_user: action.payload.type_user,
      };
    default:
      return state;
  }
};
