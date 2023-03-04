import { AlertColor, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector, useThunkAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import {
  creatTaskAction,
  deleteTaskAction,
  selectAll,
  taskListAction,
  updateTaskAction
} from '../store/modules/TasksSlice';
import Modal from '../components/Modal';
import ModalDelete from '../components/ModalDelete';
import BasicAlert from '../components/BasicAlert';
import { TaskInfo } from '../types';
import InputTask from '../components/InputTask';
import TaskCard from '../components/TaskCard';
import { CreateTaskType, DeleteTaskType } from '../service/api.service';

const Tasks: React.FC = () => {
  const [editingTask, setEditingTask] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [message, setAlertMessage] = useState<string>('');
  const [color, setColor] = useState<AlertColor>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const taskList = useAppSelector(selectAll);
  const loginRedux = useAppSelector(state => state.login);
  const navigate = useNavigate();
  const thunkDispatch = useThunkAppDispatch();

  useEffect(() => {
    console.log('lista de tasks', taskList);
    if (!loginRedux.logged) {
      alert('Faça o login!');
      navigate('/');
      return;
    }
    thunkDispatch(taskListAction(loginRedux.user.id));
  }, [loginRedux, navigate, thunkDispatch]);

  const handleAddTask = async (task: CreateTaskType) => {
    const result = await thunkDispatch(
      creatTaskAction({
        userId: task.userId,
        id: task.id,
        title: task.title,
        description: task.description
      })
    ).unwrap();
    setIsOpen(true);
    setColor('success');
    setAlertMessage('Task criada com sucesso');
  };

  const handleClickOpen = (id: string) => {
    setEditingTask(id);
    setOpenModal(true);
  };

  const handleClickClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (task: CreateTaskType) => {
    thunkDispatch(updateTaskAction(task));
    setOpenModal(false);
  };

  const handleDeleteTask = (id: string) => {
    setEditingTask(id);
    setOpenConfirmModal(true);
  };

  const handleArchiveTask = (id: string) => {
    setEditingTask(id);
    setOpenConfirmModal(true);
  };

  const handleConfirmModal = (task: DeleteTaskType) => {
    thunkDispatch(deleteTaskAction(task));
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

            {taskList.map((item: any) => {
              return item ? (
                <TaskCard
                  key={item._id}
                  handleClickOpen={handleClickOpen}
                  handleDeleteTask={handleDeleteTask}
                  handleArchiveTask={handleArchiveTask}
                  task={item}
                />
              ) : null;
            })}

            <Modal id={editingTask} handleCloseEdit={handleClickClose} handleEdit={handleEdit} isOpen={openModal} />
            <ModalDelete
              id={editingTask}
              handleConfirmClose={handleConfirmClose}
              handleConfirmModal={handleConfirmModal}
              isOpen={openConfirmModal}
            />
            <BasicAlert message={message} openAlert={isOpen} setOpenAlert={setIsOpen} alertColor={color} />
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Tasks;
