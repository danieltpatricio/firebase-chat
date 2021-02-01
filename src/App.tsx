import React, { memo, useReducer, useEffect } from 'react';
import { AuthContext, authReducer, initialState } from 'stores/auth';
import { Types } from 'models/enums/auth';
import Pages from 'pages';
import firebaseAuthService from 'services/auth';
import { BrowserRouter } from 'react-router-dom';

const App = memo(() => {
  const [store, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    firebaseAuthService.onAuthChange((user)=> {
      if (user) {
        dispatch({ type: Types.LOGIN, payload: { user } });
      } else {
        dispatch({ type: Types.LOGOUT });
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </AuthContext.Provider>
  );
});

export default App;
