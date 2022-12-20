import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { addTask, deleteTask, selectTasks, updateTask } from '../store/modules/TaskSlice';
import Modal from '../components/Modal';
import ModalDelete from '../components/ModelDelete';
import BasicAlert from '../components/BasicAlert';
import { TaskInfo } from '../types';

const Contact: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editingTask, setEditingTask] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tasksRedux = useAppSelector(selectTasks);
  const loggedRedux = useAppSelector(state => state.logged);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedRedux) {
      alert('Faça o login!');
      navigate('/');
    }
  }, [loggedRedux, navigate]);

  const isEmpty = () => {
    if (title === '' || description === '') {
      setIsOpen(true);
      setMessage('Adicione o nome e/ou a descrição da tarefa.');
      return true;
    } else {
      return false;
    }
  };

  const handleAddTask = () => {
    if (!isEmpty()) {
      dispatch(addTask({ title, description, id: Math.floor(Date.now() / 1000), userEmail: loggedRedux }));
      setDescription('');
      setTitle('');
    }
  };

  const handleDeleteTask = (id: number) => {
    setEditingTask(id);
    setOpenConfirmModal(true);
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

  const handleConfirmClose = () => {
    setOpenConfirmModal(false);
  };

  const handleConfirmModal = (id: number) => {
    dispatch(deleteTask(id));
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
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                mt: '20px',
                mx: '10px',
                fontFamily: 'Cutive Mono',
                color: 'text.secondary',
                fontSize: '45px'
              }}
            >
              Minhas Tasks
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid',
                borderColor: 'text.disabled',
                borderRadius: '8px',
                padding: '15px',
                mx: '40px',
                mt: '20px'
              }}
            >
              <TextField
                variant="standard"
                id="title"
                name="title"
                autoComplete="title"
                autoFocus
                placeholder="Nome da tarefa"
                InputProps={{
                  disableUnderline: true
                }}
                value={title}
                onChange={ev => setTitle(ev.target.value)}
              ></TextField>
              <TextField
                sx={{ my: 1 }}
                id="description"
                name="description"
                autoComplete="description"
                autoFocus
                variant="standard"
                placeholder="Descrição"
                InputProps={{
                  disableUnderline: true
                }}
                value={description}
                onChange={ev => setDescription(ev.target.value)}
              ></TextField>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                mx: '40px',
                mt: '5px',
                mb: '15px'
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  fontFamily: 'Poppins',
                  color: 'text.secondary',
                  backgroundColor: 'action.disabled',
                  marginRight: '10px'
                }}
              >
                Limpar
              </Button>
              <Button
                onClick={() => handleAddTask()}
                variant="contained"
                size="small"
                startIcon={<AddIcon sx={{ color: 'background.default' }} />}
                sx={{ fontFamily: 'Poppins', color: 'background.default', backgroundColor: 'action.active' }}
              >
                Adicionar
              </Button>
            </Box>
            {tasksRedux
              .filter(task => task.userEmail === loggedRedux)
              .map(item => {
                return (
                  <Card sx={{ my: 2, mx: 5 }} key={item.id}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography gutterBottom variant="body1" component="div">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <>
                            <IconButton
                              onClick={() => handleClickOpen(item.id)}
                              edge="end"
                              aria-label="edit"
                              sx={{ marginRight: '5px' }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteTask(item.id)} edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
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
