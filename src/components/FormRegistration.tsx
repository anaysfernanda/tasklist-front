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
  confirm: string;
  showConfirm: boolean;
}

interface FormRegistrationProps {
  handleRegistration: (validation: FormValidation) => void;
}

const emailValidator = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

const FormRegistration: React.FC<FormRegistrationProps> = ({ handleRegistration }) => {
  const [email, setEmail] = useState<string>('');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    confirm: '',
    showConfirm: false
  });
  const accountRedux = useAppSelector(selectAccount);

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

  const validateForm = (): FormValidation => {
    let errorMessage = '';

    const isEmailValid = () => {
      if (!emailValidator.test(email)) {
        errorMessage = 'Preencha um e-mail válido';
        return false;
      } else {
        return true;
      }
    };

    const isValidPassword = () => {
      if (values.password.length <= 5) {
        errorMessage = 'A senha deve ter no mínimo 6 caractéres.';
        return false;
      } else {
        return true;
      }
    };

    const confirmPassword = () => {
      if (values.password !== values.confirm) {
        errorMessage = 'Senhas não conferem!';
        return false;
      } else {
        return true;
      }
    };

    const isEmailExist = () => {
      if (accountRedux.some(user => email === user.email)) {
        errorMessage = 'E-mail já cadastrado, faça o login!';
        return false;
      } else {
        return true;
      }
    };

    if (isEmailValid() && confirmPassword() && isValidPassword() && isEmailExist()) {
      return { valid: true, email, password: values.password };
    } else {
      return { valid: false, message: errorMessage };
    }
  };

  const registration = () => {
    const formValidation = validateForm();
    handleRegistration(formValidation);
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
        value={email || ''}
        type="adress"
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
          onClick={() => registration()}
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
    </>
  );
};

export default FormRegistration;
