import { AlertColor, Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicAlert from '../components/BasicAlert';
import { Card } from '../components/Card/Card';
import FormRegistration from '../components/FormRegistration';
import { createUser } from '../service/api.service';

const Registration: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [color, setColor] = useState<AlertColor>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const emailValidator = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const handleError = (message: string) => {
    setIsOpen(true);
    setColor('error');
    setAlertMessage(message);
  };

  const handleRegistration = async (form: { email: string; password: string; confirm: string }) => {
    if (!emailValidator.test(form.email)) {
      handleError('Preencha um e-mail válido');
      return;
    }
    if (form.password.length <= 5) {
      handleError('A senha deve ter no mínimo 6 caractéres.');
      return;
    }
    if (form.password !== form.confirm) {
      handleError('Senhas não conferem!');
      return;
    }

    const result = await createUser({ email: form.email, password: form.password });
    if (result.ok) {
      setIsOpen(true);
      setColor('success');
      setAlertMessage('Usuário criado com sucesso.');
      navigate('/');
      return;
    }
    handleError('O e-mail já possui cadastro. Faça o login!');
    return;
  };

  return (
    <Card title="Cadastro">
      <Box>
        <FormRegistration handleRegistration={handleRegistration} />
        <BasicAlert message={alertMessage} openAlert={isOpen} setOpenAlert={setIsOpen} alertColor={color} />
      </Box>
    </Card>
  );
};

export default Registration;
