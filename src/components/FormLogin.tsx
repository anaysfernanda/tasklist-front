/* eslint-disable no-unused-vars */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectAccount } from '../store/modules/AccountSlice';
import { FormValidation } from '../types';

interface State {
  password: string;
  showPassword: boolean;
}

interface FormLoginProps {
  handleLogin: (validation: FormValidation) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ handleLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });
  const accountList = useAppSelector(selectAccount);

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validateForm = (): FormValidation => {
    let errorMessage = '';

    const isEmailValid = () => {
      if (email === '' && values.password === '') {
        errorMessage = 'Preencha o e-mail e senha';
        return false;
      } else {
        setEmail('');
        setValues({
          ...values,
          password: ''
        });
        return true;
      }
    };

    const validateLogin = () => {
      const userExist = accountList.some(item => email === item.email && values.password === item.password);
      if (!userExist) {
        errorMessage = 'E-mail e/ou senha incorretos!';
      } else {
        setEmail('');
        setValues({
          ...values,
          password: ''
        });
        return userExist;
      }
    };

    if (isEmailValid() && validateLogin()) {
      return { valid: true, email, password: values.password };
    } else {
      return { valid: false, message: errorMessage };
    }
  };

  const login = () => {
    const formValidation = validateForm();
    handleLogin(formValidation);
  };

  return (
    <>
      <TextField
        sx={{ marginBottom: '10px' }}
        onChange={ev => setEmail(ev.target.value)}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
      ></TextField>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button onClick={() => login()} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Fazer login
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <Link href="/registration" variant="body2">
          {'Não tem uma conta ainda? Crie uma conta'}
        </Link>
      </Box>
    </>
  );
};

export default FormLogin;
