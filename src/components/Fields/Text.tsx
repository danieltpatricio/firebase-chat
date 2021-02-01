import { useFormikContext, useField } from 'formik';
import React, { ChangeEvent, memo, useCallback, DetailedHTMLProps, InputHTMLAttributes } from 'react';

type IProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string;
  label?: string;
  formik?: boolean;
};

const TextField = memo<IProps>(({ formik: isFormik, value, name, label,  onChange, ...props }) => {
  const formik = useFormikContext<any>();
  const [field, meta , helpers] = useField({ name });
  value = formik ? formik.values[name] : value;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!formik) {
        onChange && onChange(e);
        return;
      }

      helpers.setTouched(true, false);
      helpers.setValue(e.currentTarget.value, true);
    },
    [formik, helpers, onChange]
  );

  return (
    <>
      <label>
        {label}
        <input {...field} {...props} onChange={handleChange} />
      </label>
      {(meta.touched && meta.error) && (
        <div className="error">{meta.error}</div>
      )}
    </>
  );
});

export default TextField;
