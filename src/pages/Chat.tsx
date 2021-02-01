import 'assets/styles/chat.css';
import React, { memo, useEffect, useState } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import TextField from 'components/Fields/Text';
import { IChatMessage } from 'models/interfaces/chat-message';
import cloudFirestoreService from 'services/cloudFirestore';
import firebaseAuthService from 'services/auth';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

interface Values {
  message: string;
}

const Chat = memo(() => {
  const [chatMessages,setChatMessage] = useState<IChatMessage[]>([]);
  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const currentUser = await firebaseAuthService.getCurrentUser();
    cloudFirestoreService.sendChatMessage({ ...values, author: currentUser?.displayName || currentUser?.email || "Anônimo"})
  }

  useEffect(()=> {
    cloudFirestoreService.listenChatMessage((newMessage) => {
      const messages = newMessage.docs.map(nm => nm.data())
      setChatMessage(messages);
    })
  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className='title'>Chat da Live WA</Typography>
          <Button color='secondary'>Logout</Button>
        </Toolbar>
      </AppBar>
      {chatMessages.map(i => (
        <div key={`messages-${i.id}`}>
          Enviado: {i.createdAt?.toLocaleString('pt-br')}<br/>
          Autor: {i.author}<br/>
          Message: {i.message}
        </div>
      ))}
      <Formik initialValues={{} as Values} onSubmit={onSubmit}>
        <Form>
          <TextField name='message' />
          <button type='submit'>Enviar</button>
        </Form>
      </Formik>
    </>
  );
});

export default Chat;
