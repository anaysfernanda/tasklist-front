/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectTasksId } from '../store/modules/TaskSlice';
import { TaskInfo } from '../types';

interface ModalProps {
  handleCloseEdit: () => void;
  handleEdit: (task: TaskInfo) => void;
  isOpen: boolean;
  id: number;
}

const Modal: React.FC<ModalProps> = ({ id, handleCloseEdit: handleClose, handleEdit, isOpen }) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const taskId = useAppSelector(state => selectTasksId(state, id));

  useEffect(() => {
    if (id !== 0) {
      setNewTitle(taskId?.title as string);
      setNewDescription(taskId?.description as string);
    }
  }, [taskId]);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Editar Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nova tarefa"
          type="text"
          fullWidth
          variant="outlined"
          value={newTitle}
          onChange={ev => setNewTitle(ev.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nova descrição"
          type="text"
          fullWidth
          variant="outlined"
          value={newDescription}
          onChange={ev => setNewDescription(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleEdit({ id, title: newTitle, description: newDescription })}>Editar</Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
