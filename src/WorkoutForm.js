import React, { useState } from 'react';
import './WorkoutForm.css';

const WorkoutForm = ({ workouts, setWorkouts }) => {
  const [workout, setWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState(null);
  const [location, setLocation] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCalories = async (workoutName) => {
    const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/exercise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'a3317929',
        'x-app-key': 'ee6968d53e07a7e0c28c463f87fb48e6'
      },
      body: JSON.stringify({
        query: workoutName
      })
    });
    const data = await response.json();
    return data.exercises[0]?.nf_calories || 0;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setWorkout(input);

    // Fetch suggestions when input length is at least 1
    if (input.length >= 1) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (input) => {
    // Additional workout suggestions
    const hardcodedSuggestions = [
      'Running', 'Swimming', 'Cycling', 'Yoga', 'Strength Training', 'Pilates', 'Hiking',
      'Rowing', 'Jumping Rope', 'Dancing', 'Boxing', 'Kickboxing', 'Zumba', 'CrossFit',
      'Elliptical Training', 'Tai Chi', 'Skiing', 'Snowboarding', 'Surfing', 'Rock Climbing'
    ];

    const filteredSuggestions = hardcodedSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(input.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setWorkout(suggestion);
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calorieCount = await fetchCalories(workout);
    setCalories(calorieCount);
    getLocation();
    const newWorkout = { workout, duration, calories: calorieCount, location };
    setWorkouts([...workouts, newWorkout]);
    setWorkout('');
    setDuration('');
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Hide suggestions when input field loses focus
    setShowSuggestions(false);
  };

  return (
    <div className="workout-form">
      <h2>Log Workout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Workout:
          <input
            type="text"
            value={workout}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </label>
        <ul className="suggestions">
          {showSuggestions &&
            suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
        </ul>
        <label>
          Duration (minutes):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Workout</button>
      </form>
      {calories !== null && <p>Calories Burned: {calories}</p>}
      {location.latitude && <p>Location: {location.latitude}, {location.longitude}</p>}
    </div>
  );
};

export default WorkoutForm;
