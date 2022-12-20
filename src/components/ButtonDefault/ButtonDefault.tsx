import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { purple } from '@mui/material/colors';

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: purple[700]
  },
  borderRadius: '10px'
}));

interface ButtonDefaultProps {
  label: string;
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ label }) => {
  return <ButtonStyled>{label}</ButtonStyled>;
};

export default ButtonDefault;
