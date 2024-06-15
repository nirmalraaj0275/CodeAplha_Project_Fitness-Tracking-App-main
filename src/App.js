import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';
import GoalForm from './GoalForm';
import Progress from './Progress';
import BMICalculator from './BMICalculator';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);

  const updateGoal = (index, newGoal) => {
    const updatedGoals = goals.map((goal, i) => (i === index ? newGoal : goal));
    setGoals(updatedGoals);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fitness Tracker</h1>
      </header>
      <nav>
        <a href="#workouts">Log Workout</a>
        <a href="#goals">Set Goal</a>
        <a href="#progress">Progress</a>
        <a href="#bmi">BMI Calculator</a>
      </nav>
      <section id="workouts">
        <WorkoutForm workouts={workouts} setWorkouts={setWorkouts} />
      </section>
      <section id="goals">
        <GoalForm goals={goals} setGoals={setGoals} />
      </section>
      <section id="progress">
        <Progress
          workouts={workouts}
          goals={goals}
          updateGoal={updateGoal}
          deleteGoal={deleteGoal}
        />
      </section>
      <section id="bmi">
        <BMICalculator />
      </section>
    </div>
  );
}

export default App;
