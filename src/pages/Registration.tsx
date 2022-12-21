import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicAlert from '../components/BasicAlert';
import { Card } from '../components/Card/Card';
import FormRegistration from '../components/FormRegistration';
import { useAppDispatch } from '../store/hooks';
import { addAccount } from '../store/modules/AccountSlice';
import { FormValidation } from '../types';

const Registration: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegistration = (validation: FormValidation) => {
    if (validation.valid) {
      dispatch(addAccount({ email: validation.email, password: validation.password }));
      navigate('/');
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
