import 'assets/styles/chat.css';
import React, { memo } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import TextField from 'components/Fields/Text';

interface Values {
  message: string;
}

const Chat = memo(() => {

  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    console.log(values.message)
  }

  return (
    <>
      <div>
        Author:
        Message:
      </div>
      <Formik initialValues={{} as Values} onSubmit={onSubmit}>
        <Form className='login-form'>
          <TextField name='message' formik />
          <button type='submit'>Enviar</button>
        </Form>
      </Formik>
    </>
  );
});

export default Chat;
