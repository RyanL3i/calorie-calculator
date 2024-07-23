import React from 'react';
import GreetingForm from './GreetingForm';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Calorie Recommender</h1>
      <p className="subtext">Enter your information below:</p>
      <GreetingForm />  
    </div>
  );
}

export default App;