import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    async function readServerData() {
      const resp = await fetch('/api/hello');
      const data = await resp.json();

      console.log('Data from server:', data);

      setServerData(data.message);
    }
    console.log(serverData);
    readServerData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<NavBar />}></Route>
    </Routes>
  );
}

export default App;
