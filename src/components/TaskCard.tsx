/* eslint-disable no-unused-vars */
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { TaskType } from '../types';

interface TaskCardProps {
  task: TaskType;
  handleClickOpen: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleClickOpen, handleDeleteTask }) => {
  return (
    <Card sx={{ my: 2, mx: 5 }} key={task.id}>
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            <Typography gutterBottom variant="body1" component="div">
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid>
              <>
                <IconButton
                  onClick={() => handleClickOpen(task.id)}
                  edge="end"
                  aria-label="edit"
                  sx={{ marginRight: '5px' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task.id)} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
