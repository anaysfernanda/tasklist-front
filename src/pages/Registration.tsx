import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicAlert from '../components/BasicAlert';
import { Card } from '../components/Card/Card';
import FormRegistration from '../components/FormRegistration';
import { createUser } from '../service/api.service';
import { useAppDispatch } from '../store/hooks';
import { FormValidation } from '../types';

const Registration: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegistration = async (validation: FormValidation) => {
    if (validation.valid) {
      const user = {
        email: validation.email,
        password: validation.password
      };
      const result = await createUser(user);
      if (result.ok) {
        alert('Usuário criado com sucesso!');
        navigate('/');
      }
    } else {
      setIsOpen(true);
      setAlertMessage(validation.message);
    }
  };

  return (
    <Card title="Cadastro">
      <Box>
        <FormRegistration handleRegistration={handleRegistration} />
        <BasicAlert message={alertMessage} openAlert={isOpen} setOpenAlert={setIsOpen} />
      </Box>
    </Card>
  );
};

export default Registration;
