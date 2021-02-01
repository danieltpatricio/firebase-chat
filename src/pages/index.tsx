import GuardRoutes from 'components/Guards/Route';
import React, { memo, useCallback, useEffect, useContext } from 'react';
import { useHistory, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import { AuthContext } from 'stores/auth';

/* import AdminPage from './Admin';
import NewPasswordPage from './Public/NewPassword'; */

const Pages = memo(() => {
  const renderEmpty = useCallback(() => <div />, []);
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);
  const history = useHistory();
  const { store } = useContext(AuthContext);
  
  useEffect(() => {
    if (store.user) {
        history.push('/');
      }
  }, [history, store.user])

  return (
    <Switch>
      {/* <Route path='/nova-senha' exact component={NewPasswordPage} /> */}
      <Route path='/login' exact component={Login} />
      <GuardRoutes path='/' component={Chat} />
      <Route path='/reload' exact render={renderEmpty} />
      <Route render={renderRedirect} />
    </Switch>
  );
});

export default Pages;
