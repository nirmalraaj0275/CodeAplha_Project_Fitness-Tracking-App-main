import React, { useState } from 'react';
import './Progress.css';

const Progress = ({ goals, updateGoal, deleteGoal }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [newGoalText, setNewGoalText] = useState('');

  const handleEditClick = (index, goalText) => {
    setIsEditing(index);
    setNewGoalText(goalText);
  };

  const handleSaveClick = (index) => {
    updateGoal(index, newGoalText);
    setIsEditing(null);
    setNewGoalText('');
  };

  return (
    <div className="progress">
      <h2>Progress</h2>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            <div className="goal-text">
              {isEditing === index ? (
                <input
                  type="text"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                />
              ) : (
                <span>{goal}</span>
              )}
            </div>
            <div className="goal-buttons">
              {isEditing === index ? (
                <button onClick={() => handleSaveClick(index)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEditClick(index, goal)}>Edit</button>
                  <button onClick={() => deleteGoal(index)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Progress;
