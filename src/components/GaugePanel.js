import React from 'react';
import { Paper, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { FlashOn as FlashOnIcon, BatteryFull as BatteryFullIcon, MonetizationOn as MonetizationOnIcon, Waves as WavesIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';
import GaugeChart from 'react-gauge-chart';
import { Liquid } from '@ant-design/plots';

const GaugePanel = ({ data, handleRestart }) => {
  // Normalize the values
  const tensionPercent = data["Tension-Value"] / 3860;
  const billingPercent = data.Billing / 3860;

  const liquidConfig = {
    percent: billingPercent,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 600,
    },
  };

  return (
    <Paper 
      sx={{
        '&:hover': {
          boxShadow: 6,
          transition: 'box-shadow 0.3s ease',
        },
      }}
      elevation={3} 
      style={{ padding: 20 }}
    >
      <Typography variant="h6" gutterBottom>
        <FlashOnIcon /> Tension du courant
      </Typography>
      <GaugeChart id="gauge-chart2" nrOfLevels={20} percent={tensionPercent} />
      <TableContainer style={{ marginTop: 20 }}>
        <Table>
          <TableBody>
            <TableRow
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                },
              }}
            >
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  <BatteryFullIcon /> Puissance consommée
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  : {data["Power-consumption"]} kWh
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                },
              }}
            >
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  <MonetizationOnIcon /> Coût de puissance consommée
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  : {data["Power-consumption"] * 700} MGA
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                },
              }}
            >
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  <WavesIcon /> Niveau de l'eau
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  : {data.Billing}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                },
              }}
            >
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  <AccessTimeIcon /> Temps
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  : {data.time}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        <WavesIcon /> Niveau de l'eau
      </Typography>
      <Liquid {...liquidConfig} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRestart}
        sx={{
          marginTop: 20,
          '&:hover': {
            backgroundColor: 'secondary.main',
            transform: 'scale(1.05)',
            transition: 'all 0.3s ease',
          },
        }}
      >
        Redémarrer l'appareil
      </Button>
    </Paper>
  );
};

export default GaugePanel;
