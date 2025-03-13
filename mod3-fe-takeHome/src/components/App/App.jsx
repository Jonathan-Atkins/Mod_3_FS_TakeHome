import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from '../NavBar/NavBar.jsx';
import Homepage from '../Homepage/Homepage.jsx';
import SubsContainer from '../SubsContainer/SubsContainer.jsx';
import { Route, Routes } from 'react-router-dom';
import SubDetails from '../SubDetails/SubDetails.jsx';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);

  function getAllSubscriptions() {

    fetch("http://localhost:3000/api/v1/subscriptions")
    .then(response => response.json())
    .then(data => {
        setSubscriptions(data.data);
      })
    .catch(error => console.log('error message: ', error.message))
  }

  useEffect(() => {
    getAllSubscriptions();
  }, [])

   
  return (
    <main className='App'>
      <NavBar/>
      <section className='content'>
        <Routes>
          <Route path="/" element={<Homepage subscriptions={subscriptions}/>} />
          <Route path="/:id" element={<SubDetails />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;