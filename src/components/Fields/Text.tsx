import { TextFieldProps } from '@material-ui/core';
import {  useField } from 'formik';
import React, {  memo } from 'react';

type IProps = TextFieldProps & {
  name: string;
};

const TextField = memo<IProps>(({ value, name, label,  onChange, ...props }) => {
  const [field, meta] = useField({ name });

  return (
    <TextField
      {...props}
      name={name}
      value={meta.value}
      onChange={field.onChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
});

export default TextField;
