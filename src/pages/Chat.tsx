import 'assets/styles/chat.css';
import React, { memo, useEffect, useState } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import TextField from 'components/Fields/Text';
import { IChatMessage } from 'models/interfaces/chat-message';
import cloudFirestoreService from 'services/cloudFirestore';
import firebaseAuthService from 'services/auth';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import * as yup from 'yup';
import { IUser } from 'models/interfaces/user';

interface Values {
  message: string;
}

const validationSchema = yup.object().shape({
  message: yup.string().required().min(1).max(50)
});

const Chat = memo(() => {
  const [chatMessages, setChatMessage] = useState<IChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser>();

  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const _currentUser = await firebaseAuthService.getCurrentUser();
    try {
      await cloudFirestoreService.sendChatMessage({ 
        ...values,
        author: _currentUser?.displayName || _currentUser?.email || "Anônimo",
        userId: _currentUser?.uid
      })
      formikHelpers.resetForm({ values: { message: '' } as Values, isSubmitting: false })
    } catch (error) {
      alert('Error')
    }
  }

  useEffect(() => {
    cloudFirestoreService.listenChatMessage((newMessage) => {
      const messages = newMessage.docs.map(nm => nm.data())
      setChatMessage(messages);
    })
    firebaseAuthService.getCurrentUser().then((u) => {
      setCurrentUser( u || undefined );
    });
  }, [])

  const handleLogout = () => {
    firebaseAuthService.logout()
  }

  return (
    <div className='container'>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className='title'>Chat da Live WA</Typography>
            <Button color='secondary' onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ overflow: 'auto' }}>
        <List className='chat-list'>
          {chatMessages.map(i => (
            <div key={`messages-${i.id}`}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={i.author}>{i.author[0].toLocaleUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={currentUser?.uid === i.userId ? 'Você' : i.author}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className='inline'
                        color="textPrimary"
                      >
                        {i.message}
                      </Typography><br />
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >{i.createdAt?.toLocaleString('pt-BR')}</Typography>
                    </>
                  }
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      </div>
      <div>
        <AppBar position="static" color='transparent'>
          <Toolbar color=''>
            <Formik initialValues={{} as Values} onSubmit={onSubmit} validationSchema={validationSchema}>
              {(formik)=> (
                <Form className='form-chat'>
                  <div>
                    <TextField name='message' label='Mensagem' margin='none' variant="standard" disabled={formik.isSubmitting} fullWidth/>
                  </div>
                  <div>
                    <IconButton size='small' type='submit' disabled={Boolean(formik.isSubmitting || !formik.values.message)}>
                      <SendIcon fontSize='small'/>
                    </IconButton>
                  </div>
                </Form>
              )}
            </Formik>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
});

export default Chat;
