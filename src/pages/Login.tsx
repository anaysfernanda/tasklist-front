import React, { useState } from 'react';
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
import { Card } from '../components/Card/Card';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { selectAccount } from '../store/modules/AccountSlice';
import { doLogin } from '../store/modules/LoggedSlice';
import BasicAlert from '../components/BasicAlert';

interface State {
  password: string;
  showPassword: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const accountList = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEmailValid = () => {
    if (email === '' && values.password === '') {
      setIsOpen(true);
      setMessage('Preencha o e-mail! e senha');
      return false;
    } else {
      return true;
    }
  };

  const validateLogin = () => {
    const userExist = accountList.some(item => email === item.email && values.password === item.password);
    if (!userExist) {
      setIsOpen(true);
      setMessage('E-mail e/ou senha incorretos!');
    } else {
      return userExist;
    }
  };

  const handleLogin = () => {
    if (isEmailValid() && validateLogin()) {
      dispatch(doLogin(email));
      navigate('/task-list');
    } else {
      setEmail('');
      setValues({
        ...values,
        password: ''
      });
    }
  };

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

  return (
    <Card title="Iniciar Sessão">
      <Box>
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
        <Button onClick={() => handleLogin()} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Fazer login
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Link href="/registration" variant="body2">
            {'Não tem uma conta ainda? Crie uma conta'}
          </Link>
        </Box>
        <BasicAlert message={message} openAlert={isOpen} setOpenAlert={setIsOpen} />
      </Box>
    </Card>
  );
};

export default Login;
