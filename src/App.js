import './App.css';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Order from './components/Order';

function App() {
  const [data, setData] = useState([]);
  const [newOrder, setNewOrder] = useState("");
  useEffect(() => {
    fetch("https://dsek-queue.herokuapp.com/api").then((response) => {
      return response.json();
    })
    .then((responseData) => {
      setData(responseData);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <TextField value={newOrder} onChange={(event) => {
            setNewOrder(event.target.value);
        }} variant="filled" />
        <Button onClick={() => {
          const formData = new FormData();
          formData.append("content", newOrder);
          fetch("https://dsek-queue.herokuapp.com/api", {method: "POST", body: formData})
        }}>Lägg till</Button>
        {data.map((order) => (
          <Order order={order} />
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
