import MuiTextField,{ TextFieldProps } from '@material-ui/core/TextField';
import {  useField } from 'formik';
import React, {  memo } from 'react';

type IProps = TextFieldProps & {
  name: string;
};

const TextField = memo<IProps>(({ value, name, onChange, ...props }) => {
  const [field, meta] = useField({ name });


  const hasError = meta.touched && Boolean(meta.error);
  const helperText= meta.touched && meta.error

  return (
    <MuiTextField
      variant='outlined'
      size='small'
      {...props}
      name={name}
      value={meta.value}
      onChange={field.onChange}
      error={hasError}
      helperText={helperText}
    />
  );
});

export default TextField;
