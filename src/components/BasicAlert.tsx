/* eslint-disable no-unused-vars */
import { Snackbar, Stack } from '@mui/material';

import React from 'react';
import { AlertElement } from './AlertElement';

interface BasicAlertProps {
  message: string;
  openAlert: boolean;
  setOpenAlert: (isOpen: boolean) => void;
}

const BasicAlert: React.FC<BasicAlertProps> = ({ message, openAlert, setOpenAlert }) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <AlertElement onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </AlertElement>
      </Snackbar>
    </Stack>
  );
};

export default BasicAlert;
