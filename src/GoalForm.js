import React, { useState } from 'react';
import './GoalForm.css';

const GoalForm = ({ goals, setGoals }) => {
  const [goal, setGoal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (goal.trim()) {
      setGoals([...goals, goal]);
      setGoal('');
    }
  };

  return (
    <div className="goal-form">
      <h2>Set Goal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;
