import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealDialog = ({ mealId, isOpen, onClose }) => {
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        if (isOpen && mealId) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => {
                    if (response.data && response.data.meals) {
                        setMeal(response.data.meals[0]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching meal:', error);
                });
        }
    }, [isOpen, mealId]);

    if (!isOpen) return null; // If not open, do not render the dialog

    // Default to empty string if strInstructions is undefined
    const instructions = meal?.strInstructions || '';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50  ">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full h-3/4 relative">
                <div className="p-6  h-full overflow-y-auto">
                    <button
                        className="absolute top-2 right-6 text-red-500 text-3xl hover:text-red-700 font-bold"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    {meal ? (
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-bold mb-4">{meal.strMeal}</h2>
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-64 h-64 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                            <ol className="list-decimal pl-6">
                                {instructions.split('\r\n').map((step, index) => (
                                    <li key={index} className="mb-2">
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealDialog;
