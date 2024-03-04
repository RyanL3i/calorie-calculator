import React from 'react';
import GreetingForm from './GreetingForm';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Calorie Recommender</h1>
      <p className="subtext">Enter your information below:</p>
      <GreetingForm />
      <p className = "explainHeader">Explanation:</p>
      <p className = "explanation"> The calculation for maintenance calories was calculated via the Mifflin-St Jeor Equation, which measures the RMR 
      (resting metabolic rate: the amount of calories the body burns while at rest). Through studies, researchers have found the equation is capable of measuring 
      RMR to within 10% of those measured. That number is then multiplied by a multiplier, which depends on the level of activity per week of the user. After that multiplier,
      we are then able to calculate the RMR, or how many calories a perfect maintenance would need. </p>
      <p className = "explanation"> In order to take into account a user's weight goals, additional calculations must be performed. A gradual weight loss typically involves losing
      1 pound a week, with a more aggressive weight loss program losing 1.5 pounds. A gradual bulk usually results in a gain of 0.5 pounds a week, while a more aggressive bulk
      can gain around 1 pound a week. With 1 pound equating to 3500 calories, it is simple to calculate the number of calories needed in excess or deficit based on personal goals. </p>


      
      
    </div>
  );
}

export default App;