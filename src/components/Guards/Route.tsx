import React, { Fragment } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import PermissionHide from './Hide';

interface IProps extends RouteProps {
  children?: JSX.Element;
}

function PermissionRoute(props: IProps) {

  return (
    <Fragment>
      <PermissionHide>
        <Route {...props} />
      </PermissionHide>
      <PermissionHide inverse>
        <Redirect to='/login' />
      </PermissionHide>
    </Fragment>
  );
}

export default PermissionRoute;
