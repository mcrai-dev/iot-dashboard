import React, { useEffect, useState } from 'react';
import axios from 'axios';
import database from '../firebase';
import { ref, onValue, update } from 'firebase/database';
import { Container, Typography, Grid, Paper, Button, IconButton, TextField, AppBar, Toolbar, Box } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Wifi as WifiIcon } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MapContainer from './MapContainer';
import GaugePanel from './GaugePanel';

const Dashboard = () => {
  const [data, setData] = useState({
    Billing: 0,
    "Current-Value": 0,
    Lamp: 0,
    "Power-consumption": 0,
    "Tension-Value": 0,
    time: "null"
  });

  const [predictions, setPredictions] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const dataRef = ref(database, 'Compteur1');
    onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setData(value);
      setToggle(value.Lamp === 1);
    });
  }, []);

  const fetchPredictions = async () => {
    try {
      console.log("Fetching predictions with:", { startDate, endDate });
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        start_date: startDate,
        end_date: endDate
      });
      console.log("Response received:", response.data);
      setPredictions(response.data.predictions);
      setTotalConsumption(response.data.total_consumption_kWh / 1000); // Assuming this value is in Wh, converting to kWh
      setTotalCost((response.data.total_consumption_kWh / 1000) * unitPrice); // Adjusting cost calculation
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handleRestart = () => {
    update(ref(database, 'Compteur1'), { Lamp: toggle ? 0 : 1 });
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 40 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IoT Monitoring systems
          </Typography>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit">
            <WifiIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom style={{ marginTop: 20 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <GaugePanel data={data} handleRestart={handleRestart} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
            <Typography variant="h6" gutterBottom>
              Prédiction de Consommation
            </Typography>
            <TextField
              label="Date de Début"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => {
                console.log("Start Date:", e.target.value);
                setStartDate(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 20 }}
            />
            <TextField
              label="Date de Fin"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => {
                console.log("End Date:", e.target.value);
                setEndDate(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 20 }}
            />
            <TextField
              label="Prix par kWh"
              type="number"
              fullWidth
              value={unitPrice}
              onChange={(e) => {
                console.log("Unit Price:", e.target.value);
                setUnitPrice(e.target.value);
              }}
              style={{ marginBottom: 20 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={fetchPredictions}
            >
              Prévoir
            </Button>
          </Paper>
          <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
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
          <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
            <MapContainer />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }} />
      <footer style={{ textAlign: 'center', marginBottom: 20 }}>
        <Typography variant="body2" color="text.secondary">
          Copyright - Mcrai Laydam
        </Typography>
      </footer>
    </Container>
  );
};

export default Dashboard;
