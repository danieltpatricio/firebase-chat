import 'assets/styles/login.css';

import React, { memo } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import firebaseAuthService from 'services/auth';
import TextField from 'components/Fields/Text';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
interface Values {
  email: string;
  displayName: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().min(1).max(50),
  displayName: yup.string().required().min(1).max(50),
  password: yup.string().required().min(1).max(50),
});


const Signup = memo(() => {
  const history = useHistory()

  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const user = await firebaseAuthService.signup(values.email, values.displayName, values.password);
    if(user){
      await firebaseAuthService.logout();
      history.push('/login');
    }
  }

  const handleBack =  () => {
    history.push('/login');
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
              <TextField name='email' label='E-mail' />
            </Grid>
            <Grid item>
              <TextField name='displayName' label='Nickname' />
            </Grid>
            <Grid item>
              <TextField name='password' type='password' label='Senha' />
            </Grid>
            <Grid item>
              <Button type='submit'>Cadastre-se</Button>
            </Grid>
            <Grid item>
              <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>Voltar</Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
});

export default Signup;
