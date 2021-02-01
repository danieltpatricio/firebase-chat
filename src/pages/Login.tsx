import 'assets/styles/login.css';

import React, { memo, useContext } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import firebaseAuthService from 'services/auth';
import TextField from 'components/Fields/Text';
import { AuthContext } from 'stores/auth';
import { Types } from 'models/enums/auth';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { Link } from '@material-ui/core';

interface Values {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().min(1).max(50),
  password: yup.string().required().min(1).max(50)
});


const Login = memo(() => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory()

  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const user = await firebaseAuthService.loginWithEmail(values.email, values.password);
    dispatch({ type: Types.LOGIN, payload: { user } });
    history.push('/');
  }

  const handleLoginWithGoogle =  async () => {
    await firebaseAuthService.loginWithGoogle()
  }

  const handleLoginWithGitHub =  async () => {
    await firebaseAuthService.loginWithGitHub()
  }

  return (
    <Container>
      <Formik initialValues={{} as Values} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <Grid container spacing={2} direction='column' alignItems='center' justify='center' className='container-login'>
            <Grid item>
              <Typography variant='h4'>Firebase Chat</Typography>
            </Grid>
            <Grid item>
              <TextField name='email' label='E-mail'/>
            </Grid>
            <Grid item>
              <TextField name='password' type='password' label='Senha'/>
            </Grid>
            <Grid item>
              <Button type='submit' variant='outlined'>Login</Button>
            </Grid>
            <Grid item>
              <Link href='/signup'>Cadastre-se</Link>
            </Grid>
            <Grid item>
              <Button onClick={handleLoginWithGoogle}>Login com Google</Button>
            </Grid>
            <Grid item>
              <Button onClick={handleLoginWithGitHub}>Login com GitHub</Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
});

export default Login;
