import { useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export const useForm = <T extends Object>(initState: T, schema: any) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState(initState);

  const onChange = (value: string | boolean, field: keyof T) => {
    setState({
      ...state,
      [field]: value,
    });
    setErrors({ ...errors, [field]: '' });
  };

  const onBlur = async (value: string, field: keyof T) => {
    try {
      if (field === 'passwordConfirmation') return;
      await schema.validateAt(field, { [field]: value });
      setErrors({ ...errors, [field]: '' });
    } catch (validationError: any) {
      setErrors({ ...errors, [field]: validationError.message });
    }
  };

  const setFormValue = (form: T) => {
    setState(form);
  };

  return {
    ...state,
    ...errors,
    form: state,
    error: errors,
    onChange,
    onBlur,
    setErrors,
    setFormValue,
  };
};
