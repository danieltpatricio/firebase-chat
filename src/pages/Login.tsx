import 'assets/styles/login.css';

import React, { memo, useContext } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import firebaseAuthService from 'services/auth';
import TextField from 'components/Fields/Text';
import { AuthContext } from 'stores/auth';
import { Types } from 'models/enums/auth';
import {useHistory} from 'react-router-dom';

interface Values {
  email: string;
  password: string;
}

const Login = memo(() => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory()

  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const user = await firebaseAuthService.loginWithEmail(values.email, values.password);
    dispatch({ type: Types.LOGIN, payload: { user } });
    history.push('/');
  }

  return (
    <Formik initialValues={{} as Values} onSubmit={onSubmit}>
      <Form className='login-form'>
        <TextField name='email' formik/>
        <TextField name='password' type='password' formik/>
        <button type='submit'>Login</button>
      </Form>
    </Formik>
  );
});

export default Login;
