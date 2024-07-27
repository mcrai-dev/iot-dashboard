// PredictionForm.js
import React from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';

const PredictionForm = ({ startDate, endDate, unitPrice, setStartDate, setEndDate, setUnitPrice, fetchPredictions }) => {
  return (
    <Paper 
    elevation={3} 
    style={{ padding: 20, marginBottom: 20, }} 
    sx={{
        '&:hover': {
          boxShadow: 6,
          transition: 'box-shadow 0.3s ease',
        },
      }}>
      <Typography variant="h6" gutterBottom>
        Prédiction de Consommation
      </Typography>
      <TextField
        label="Date de Début"
        type="date"
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: 'secondary.main',
              
            },
          },
        }}
      />
      <TextField
        label="Date de Fin"
        type="date"
        fullWidth
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: 'secondary.main',
            },
          },
        }}
      />
      <TextField
        label="Prix par kWh"
        type="number"
        fullWidth
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: 'secondary.main',
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchPredictions}
        sx={{
          '&:hover': {
            backgroundColor: 'secondary.main',
            transform: 'scale(1.05)',
            transition: 'all 0.3s ease',
          },
        }}
      >
        Prévoir
      </Button>
    </Paper>
  );
};

export default PredictionForm;
