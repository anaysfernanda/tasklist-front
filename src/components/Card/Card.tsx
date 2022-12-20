import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { Welcome } from './CardStyled';

interface CardProps {
  title: string;
  children: JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(-135deg, #b1f7f3 0%, #a4a1db 65%)'
      }}
    >
      <Grid item xs={11} sm={7} md={5} lg={4}>
        <Paper
          elevation={6}
          sx={{
            padding: '35px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Welcome>{'TaskList'}</Welcome>
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Poppins', fontWeight: '300', textAlign: 'center', mb: '20px', fontSize: '18px' }}
          >
            Ferramenta de gerenciamento de tarefas inteligente e simples.
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '400', textAlign: 'center', mb: '15px' }}>
            {title}
          </Typography>
          <Box>{children}</Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Card };
