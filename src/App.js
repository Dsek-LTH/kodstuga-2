import './App.css';
import { useState, useEffect } from 'react';
import { Container, Stack } from '@mui/material';
import Order from './components/Order';
import AvailableOrders from './components/AvailableOrders';

function App() {
  const [unfinishedOrders, setUnfinishedOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);

  const fetchAllData = () => {
    fetch('https://dsek-queue.herokuapp.com/api')
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUnfinishedOrders(responseData.filter((order) => !order.isDone));
        setFinishedOrders(responseData.filter((order) => order.isDone));
      });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Container style={{ padding: '5rem' }}>
      <AvailableOrders refetch={fetchAllData} />
      <h1>Färdigt</h1>
      <Stack direction="row" flexWrap="wrap" minHeight="11rem">
        {finishedOrders.map((order) => (
          <Order order={order} fetchAllData={fetchAllData} />
        ))}
      </Stack>
      <h1>Tillagas</h1>
      <Stack direction="row" flexWrap="wrap">
        {unfinishedOrders.map((order) => (
          <Order order={order} fetchAllData={fetchAllData} />
        ))}
      </Stack>
    </Container>
  );
}

export default App;
