/* eslint-disable no-unused-vars */
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
interface TaskCardProps {
  task: any;
  handleClickOpen: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleClickOpen, handleDeleteTask }) => {
  return (
    <Card sx={{ my: 2, mx: 5 }} key={task._id}>
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            <Typography gutterBottom variant="body1" component="div" sx={{ wordBreak: 'break-all' }}>
              {task._title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
              {task._description}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid>
              <>
                <IconButton
                  onClick={() => handleClickOpen(task._id)}
                  edge="end"
                  aria-label="edit"
                  sx={{ marginRight: '5px' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task._id)} edge="end" aria-label="delete">
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
