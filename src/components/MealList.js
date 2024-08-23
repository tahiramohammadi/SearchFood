import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function MealList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mealInstructions, setMealInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  const openDialog = async() => {
    setIsOpen(true);
    setLoading(true);
    try {
      // Replace with your meal API URL or ID if necessary
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const meal = response.data.meals[0];
      setMealInstructions(meal.strInstructions);
    } catch (error) {
      console.error('Error fetching meal instructions:', error);
      setMealInstructions('Failed to load meal instructions.');
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setMealInstructions('');
  };

  // Function to fetch all meals
  const fetchAllMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        setError('No meals found.');
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
      setError('Failed to fetch meals. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAllMeals(); // Fetch meals when the component mounts
  }, []);

  return (
    <div className="text-center  pr-16 pl-16 bg-black">
      <h1 className="text-2xl font-bold mb-20">All Meals</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="border rounded-lg overflow-hidden shadow-lg ">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={openDialog} 
            />
            <div className="p-4">
              <h2 className="text-lg text-white font-semibold">{meal.strMeal}</h2>
              <a className="text-white" href={meal.strYoutube}><strong className="pb-4">Watch On Youtube:</strong><FontAwesomeIcon icon={faYoutube} size="2x" className="text-red-600 hover:text-red-800"  /></a>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-3/4  overflow-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Meal Instructions</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p className="mb-4">{mealInstructions}</p>
            )}
            <button 
              onClick={closeDialog} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealList;