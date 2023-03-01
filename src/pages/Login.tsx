import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Card } from '../components/Card/Card';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import BasicAlert from '../components/BasicAlert';
import { FormValidation } from '../types';
import FormLogin from '../components/FormLogin';
import { loginAction } from '../store/modules/loginSlice';

const Login: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (validation: FormValidation) => {
    if (validation.valid) {
      const user = {
        email: validation.email,
        password: validation.password
      };
      const result = await dispatch(loginAction(user)).unwrap();
      if (!result.ok) {
        alert(result.message);
        return;
      }
      navigate('/task-list');
    } else {
      setIsOpen(true);
      setAlertMessage(validation.message);
    }
  };

  return (
    <Card title="Iniciar Sessão">
      <Box>
        <FormLogin handleLogin={handleLogin} />
        <BasicAlert message={alertMessage} openAlert={isOpen} setOpenAlert={setIsOpen} />
      </Box>
    </Card>
  );
};

export default Login;
