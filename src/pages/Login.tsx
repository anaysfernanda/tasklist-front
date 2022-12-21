import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Card } from '../components/Card/Card';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../store/modules/LoggedSlice';
import BasicAlert from '../components/BasicAlert';
import { FormValidation } from '../types';
import FormLogin from '../components/FormLogin';

const Login: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (validation: FormValidation) => {
    if (validation.valid) {
      dispatch(doLogin(validation.email));
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
