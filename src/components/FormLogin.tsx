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
import { LoginUserType } from '../service/api.service';

interface State {
  password: string;
  showPassword: boolean;
}

interface FormLoginProps {
  handleLogin: (user: LoginUserType) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ handleLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });

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

  const login = () => {
    if (email === '' && values.password === '') {
      alert('Preencha o e-mail e senha');
      return false;
    } else {
      setEmail('');
      setValues({
        ...values,
        password: ''
      });
      handleLogin({ email, password: values.password });
    }
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
