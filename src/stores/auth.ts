import { Types } from 'models/enums/auth';
import { IUser } from 'models/interfaces/user';
import { createContext } from 'react';

type State = {
  user?: IUser;
  loading?: boolean;
};

type Action = {
  type: Types,
  payload?: State
}

export const initialState: State = { user: undefined, loading: true };

export const AuthContext = createContext(
  {} as { store: State, dispatch: (action: Action) => void },
);

export function authReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Types.LOGIN: {
      const { payload } = action;
      if (!payload) return state;
      return { ...payload, loading: false };
    }
    case Types.LOGOUT: {
      /* tokenService.cleanToken(); */
      return { ...initialState, loading: false };
    }
    default:
      return { ...state, loading: false };
  }
}