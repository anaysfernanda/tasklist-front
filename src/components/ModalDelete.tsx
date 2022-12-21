/* eslint-disable no-unused-vars */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

interface ModalDeleteProps {
  id: number;
  handleConfirmClose: () => void;
  handleConfirmModal: (id: number) => void;
  isOpen: boolean;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  id,
  handleConfirmClose: handleCloseModal,
  handleConfirmModal: handleDeleteModal,
  isOpen
}) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deseja excluir a Task?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDeleteModal(id)}>Excluir</Button>
          <Button onClick={() => handleCloseModal()}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
