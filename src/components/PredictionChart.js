// PredictionChart.js
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PredictionChart = ({ predictions, totalConsumption, totalCost }) => {
  return (
    <Paper
      elevation={3}
      style={{ padding: 20, marginTop: 20 }}
      sx={{
        '&:hover': {
          boxShadow: 6,
          transition: 'box-shadow 0.3s ease',
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Graphique de consommation d'énergie
      </Typography>
      <LineChart width={500} height={300} data={predictions}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ds" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="yhat" stroke="#8884d8" />
      </LineChart>
      <Typography variant="body1" gutterBottom style={{ marginTop: 20 }}>
        Consommation totale : {totalConsumption} kWh
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginTop: 20 }}>
        Coût total : {totalCost} MGA
      </Typography>
    </Paper>
  );
};

export default PredictionChart;
