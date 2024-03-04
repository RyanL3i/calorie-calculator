import React, { useState } from 'react';
import './GreetingForm.css'; // Create a new CSS file for GreetingForm styles

// initialization
const GreetingForm = () => {  // way of initializing a functional comoponent, does all the heavy lifting and we just call <GreetingForm> in App.js
  const [weight, setWeight] = useState(''); // declare state variable "weight" and function "setWeight" to update value, initialized to empty string.
  const [age, setAge] = useState('');       // useState allows to add functional components, returns array: const [state, setState] = useState(initial)
  const [height, setHeight] = useState('');
  const [biologicalSex, setBiologicalSex] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [weightGoal, setWeightGoal] = useState('');
  const [bmrResult, setBmrResult] = useState(null);


  // "handle" functions, handling change of state
  const handleWeightChange = (event) => { // arrow function, same as normal just different syntax! takes in event 
    setWeight(event.target.value);        // (change event triggered when user types into weight input field)
  };                                      // grabs the value of the html element triggered in the event (click, input, etc)

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleBiologicalSexChange = (event) => {
    setBiologicalSex(event.target.value);
  };

  const handleActivityLevelChange = (event) => {
    setActivityLevel(event.target.value);
  };

  const handleWeightGoalChange = (event) => {
    setWeightGoal(event.target.value);
  }

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);  // turns the string input into a float for operations
    const heightInCm = parseFloat(height);
    const ageValue = parseFloat(age);

    if (isNaN(weightInKg) || isNaN(heightInCm) || isNaN(ageValue)) {        // if no value or dropdown option selected, error (alert)
      alert('Please enter valid numerical values for weight, height, and age.');
      return;
    }

    // Convert height to meters
    const heightInMeters = heightInCm / 100;

    // Calculate BMR based on biological sex
    let bmr;
    if (biologicalSex === 'male') {
      bmr = 10 * weightInKg + 6.25   * heightInMeters - 5 * ageValue + 5;
    } else if (biologicalSex === 'female') {
      bmr = 10 * weightInKg + 6.25 * heightInMeters - 5 * ageValue -161;
    } else {        // if not male or female, no option was selected by the user!
      alert('Please select a biological sex.');
      return;
    }

    // Apply activity level multiplier
    if (activityLevel === 'sedentary')          // takes the activity level and checks what it is, applies appropriate multiplier
    {
      bmr *= 1.2;
    } else if (activityLevel === 'light') {
      bmr *= 1.375;
    } else if (activityLevel === 'moderate') {
      bmr *= 1.55;
    } else if (activityLevel === 'active') {
      bmr *= 1.725;
    } else if (activityLevel === 'extra active') {
      bmr *= 1.9;
    } else {
      alert('Please select a level of activity.');
      return;
    }

    if (weightGoal === 'maintain') {
    
    } else if (weightGoal === 'gradCut') {
      bmr -= 500;
    } else if (weightGoal === 'aggCut') {
      bmr -= 750;
    } else if (weightGoal === 'gradBulk') {
      bmr += 250;
    } else if (weightGoal === 'aggBulk') {
      bmr += 500;
    }
    



    //calls setBmrResult updater function with calculated bmr, React re-renders the component in its updated state.  
    setBmrResult(bmr);      
  };

  const handleFormSubmit = (event) => { //function handling a form submission, takes in an event
    event.preventDefault();       // prevents the default, which is normally a page refresh in HTML
    calculateBMR();               // calls calculateBMR, which is defined above, which also setBmrResult, updating the state
  };


  /*
  HOW DROPDOWNS WORK.....

  <select>
  <option value="apple" label="Fruit A">Apple</option>
  <option value="banana" label="Fruit B">Banana</option>
  <option value="orange" label="Fruit C">Orange</option>
  </select>
  */

  
  // creates the options for the dropdown menu for height selection
  const heights = [];
  heights.push({ value: 'N/A', label: 'N/A' });       // pushes a default selection of N/A, forcing the user to select
  for (let feet = 3; feet <= 8; feet++) {
    for (let inch = 0; inch < 12; inch++) {
      const heightInInches = feet * 12 + inch;      // gets the height in inches
      heights.push({
        value: heightInInches.toString(),           // the actual value is the height in inches, BUT
        label: `${feet}'${inch}"`,    // what is displayed is the correct "foot' inches" formatting
        // ${string} works very similar to %s in c
        // backticks are ternary operator, allow combining %s and strings in one string.
      });
    }
  }


  // array of value and labels for gender options, used later in the dropdown
  const genderOptions = [
    { value: 'N/A', label: 'N/A' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  // array of value and labels for activity options, used later in the dropdown
  const activityOptions = [
    { value: 'N/A', label: 'N/A' },
    { value: 'sedentary', label: 'Sedentary: Minimal / no exercise' },
    { value: 'light', label: 'Light: Moderate exercise 1-3x a week' },
    { value: 'moderate', label: 'Moderate: Moderate exercise 4-5x a week' },
    { value: 'active', label: 'Active: Intense exercise 3-5x a week' },
    { value: 'extra active', label: 'Extra Active: Intense exercise 6-7x a week' },
  ];


  const weightOptions = [
    { value: 'N/A', label: 'N/A' },
    { value: 'maintain', label: 'Maintain' },
    { value: 'gradCut', label: 'Gradual loss' },
    { value: 'aggCut', label: 'Aggressive loss' },
    { value: 'gradBulk', label: 'Gradual Gain' },
    { value: 'aggBulk', label: 'Aggressive Gain' },
  ];



  // begin to display everything above
  // <label> represents an input field
  // input type is a "text" (customizable), value is set to weight (declared above), and the onChange is updated through handleWeightChange function


  /*
  DROPDOWNS:
  <label> associates a label with a <input>, <select>, or <textarea>, etc....
  sets the value to the height, and when there's a change passes in handleHeightChange
  map: iterates through heights[], for each option makes a new option and
      sets the key (unique identifier) to the inches, and the value (what is sent when form submitted) to the inches
      the {option.label} is what is shown to the user.
  */



  /*
  OUPUT:
  prints bmrResult, tofixed() is the number of decimals
  ?. checks if undefined or null, otherwise doesn't call tofixed
  */
  return ( 
    <form className="greeting-form" onSubmit={handleFormSubmit}> 
      <div className="form-group">
        <label>
          Weight: 
          <input type="text" value={weight} onChange={handleWeightChange} style={{ marginLeft: '10px' }}  />
        </label>
      </div>

      <div className="form-group">
        <label>
          Age: 
          <input type="text" value={age} onChange={handleAgeChange} style={{ marginLeft: '10px' }} />
        </label>
      </div>

      <div className="form-group">
        <label>
          Select Height: 
          <select value={height} onChange={handleHeightChange} style={{ marginLeft: '10px' }} >
            {heights.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Select Biological Sex: 
          <select value={biologicalSex} onChange={handleBiologicalSexChange} style={{ marginLeft: '10px' }} >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Select Level of Activity: 
          <select value={activityLevel} onChange={handleActivityLevelChange} style={{ marginLeft: '10px' }} >
            {activityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Select Weight Goal: 
          <select value={weightGoal} onChange={handleWeightGoalChange} style={{ marginLeft: '10px' }} >
            {weightOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="output">
        <label>
          Calories Needed Per Day:
          <span> {bmrResult?.toFixed(0)}</span>
        </label>
      </div>


      <button type="submit">Submit</button>
    </form>
  );
};

export default GreetingForm;
