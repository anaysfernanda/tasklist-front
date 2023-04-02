/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UpdateTaskType } from '../service/api.service';
import { useAppSelector } from '../store/hooks';
import { selectById } from '../store/modules/TasksSlice';

interface ModalProps {
  handleCloseEdit: () => void;
  handleEdit: (task: UpdateTaskType) => void;
  isOpen: boolean;
  id: string;
  alternative: string;
}

const Modal: React.FC<ModalProps> = ({ id, handleCloseEdit: handleClose, handleEdit, isOpen, alternative }) => {
  const loginRedux = useAppSelector(state => state.login);
  const taskId = useAppSelector(state => selectById(state, id));

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Você deseja {alternative} a task? </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            handleEdit({
              userId: loginRedux.user.id,
              id
            })
          }
        >
          {alternative}
        </Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
