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
import { useNavigate } from 'react-router-dom';
import BasicAlert from '../components/BasicAlert';
import { Card } from '../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addAccount, selectAccount } from '../store/modules/AccountSlice';

interface State {
  password: string;
  showPassword: boolean;
  confirm: string;
  showConfirm: boolean;
}

const Registration: React.FC = () => {
  const accountRedux = useAppSelector(selectAccount);
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    confirm: '',
    showConfirm: false
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEmailValid = () => {
    if (email === '') {
      setIsOpen(true);
      setMessage('Preencha o e-mail!');
      return false;
    } else {
      return true;
    }
  };

  const isValidPassword = () => {
    if (values.password.length <= 5) {
      setIsOpen(true);
      setMessage('A senha deve ter no mínimo 6 caractéres.');
      return false;
    } else {
      return true;
    }
  };

  const confirmPassword = () => {
    if (values.password !== values.confirm) {
      setIsOpen(true);
      setMessage('Senhas não conferem!');
      return false;
    } else {
      return true;
    }
  };

  const isEmailExist = () => {
    if (accountRedux.some(user => email === user.email)) {
      setIsOpen(true);
      setMessage('E-mail já cadastrado, faça o login!');
      return false;
    } else {
      return true;
    }
  };

  const handleRegistration = () => {
    if (isEmailValid() && confirmPassword() && isValidPassword() && isEmailExist()) {
      dispatch(addAccount({ email, password: values.password }));
      navigate('/');
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

  const handleClickShowConfirm = () => {
    setValues({
      ...values,
      showConfirm: !values.showConfirm
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Card title="Cadastro">
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
          value={email || ''}
        ></TextField>
        <FormControl fullWidth variant="outlined" sx={{ mb: '10px' }}>
          <InputLabel htmlFor="outlined-adornment-password">Senha *</InputLabel>
          <OutlinedInput
            required
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
            label="Senha"
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" sx={{ mb: '10px' }}>
          <InputLabel htmlFor="outlined-adornment-confirm">Confirme a senha *</InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-confirm"
            type={values.showConfirm ? 'text' : 'password'}
            value={values.confirm}
            onChange={handleChange('confirm')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirm}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirme a senha"
          />
        </FormControl>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={() => handleRegistration()}
            type="submit"
            variant="contained"
            sx={{ width: '180px', mt: 1, mb: 2, backgroundColor: '#4240b3' }}
          >
            Cadastre-se
          </Button>
          <Link href="/" variant="body2">
            {'Já possui uma conta? Então faça o login.'}
          </Link>
        </Box>
        <BasicAlert message={message} openAlert={isOpen} setOpenAlert={setIsOpen} />
      </Box>
    </Card>
  );
};

export default Registration;
