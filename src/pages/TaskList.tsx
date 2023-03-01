import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { addTask, deleteTask, selectTasks, updateTask } from '../store/modules/TaskSlice';
import Modal from '../components/Modal';
import ModalDelete from '../components/ModalDelete';
import BasicAlert from '../components/BasicAlert';
import { TaskInfo } from '../types';
import { TaskValidation } from '../types/TaskValidation';
import InputTask from '../components/InputTask';
import TaskCard from '../components/TaskCard';

const Contact: React.FC = () => {
  const [editingTask, setEditingTask] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [message, setAlertMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tasksRedux = useAppSelector(selectTasks);
  const loginRedux = useAppSelector(state => state.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(loginRedux);
    if (!loginRedux) {
      alert('Faça o login!');
      navigate('/');
    }
  }, [loginRedux, navigate]);

  const handleAddTask = (validation: TaskValidation) => {
    if (validation.valid) {
      dispatch(
        addTask({
          title: validation.title,
          description: validation.description,
          id: Math.floor(Date.now() / 1000),
          userEmail: loginRedux.user.email
        })
      );
    } else {
      setIsOpen(true);
      setAlertMessage(validation.message);
    }
  };

  const handleClickOpen = (id: number) => {
    setEditingTask(id);
    setOpenModal(true);
  };

  const handleClickClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (task: TaskInfo) => {
    dispatch(updateTask({ id: task.id, changes: { description: task.description, title: task.title } }));
    setOpenModal(false);
  };

  const handleDeleteTask = (id: number) => {
    setEditingTask(id);
    setOpenConfirmModal(true);
  };

  const handleConfirmModal = (id: number) => {
    dispatch(deleteTask(id));
    setOpenConfirmModal(false);
  };

  const handleConfirmClose = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          backgroundColor: 'background.default',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        <Grid item xs={11} sm={10} md={8} lg={7} sx={{ my: 3, backgroundColor: 'action.hover', borderRadius: '7px' }}>
          <>
            <InputTask handleAddTask={handleAddTask} />
            {tasksRedux
              .filter(task => task.userEmail === loginRedux.user.email)
              .map(item => {
                return (
                  <TaskCard
                    key={item.id}
                    handleClickOpen={handleClickOpen}
                    handleDeleteTask={handleDeleteTask}
                    task={item}
                  />
                );
              })}

            <Modal id={editingTask} handleCloseEdit={handleClickClose} handleEdit={handleEdit} isOpen={openModal} />
            <ModalDelete
              id={editingTask}
              handleConfirmClose={handleConfirmClose}
              handleConfirmModal={handleConfirmModal}
              isOpen={openConfirmModal}
            />
            <BasicAlert message={message} openAlert={isOpen} setOpenAlert={setIsOpen} />
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
