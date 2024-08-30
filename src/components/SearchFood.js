import React, { useState , useEffect} from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';


const FoodSearch = () => {
  const [meals, setMeals] = useState([]);
  const [name, setName]= useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [mealInstructions, setMealInstructions] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const openDialog = async() => {
    setIsOpen(true);
    setLoading(true);
    try {
    
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



    const fetchFoods = async () => {
      setLoading(true);
      setError(null);

      try{
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=`

          );
          const mealResults = response.data.meals;
          if (mealResults) {
            setMeals(mealResults);
            setError(''); // Clear any previous error message
          } else {
            setMeals([]);
            setError('Food not found'); // Set the error message when no meals are found
          }
        }catch (error) {
          console.error('Error fetching the meals:', error);
          setError('An error occurred while searching. Please try again later.');
        }finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchFoods(); // This will run once when the component mounts
    }, []);



    const filteredMeals = meals?.filter((meal) =>
    meal.strMeal.toLowerCase().includes(name.toLowerCase())
  );
 
    const handleSearch = () => {
      fetchFoods();
    };
  

  

    return(
  
        <div className="bg-black  pl-16  pr-16 pb-16">
               <div className="text-yellow-500 text-4xl  p-16 font-extrabold text-center">Search For a Meal</div>
                <div className="flex">
        <input className="p-4 rounded-l-lg   w-5/6 md:w-full outline-none focus:bg-white" placeholder="Search your recipie here.." 
        value={name}
        onChange={(e) =>setName(e.target.value)}/>
        <button className="text-yellow-500  p-4 rounded-r-lg  bg-gray-900" onClick={ handleSearch}> Search</button>
     
        </div>
        {loading && <p>Loading...</p>}
      
      

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-12  ">
        {filteredMeals && filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
          <div key={meal.idMeal} className="border rounded-lg overflow-hidden shadow-lg ">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover cursor-pointer"
               onClick={openDialog} 
            />
            <h3 className="text-lg text-white font-semibold text-center pt-4">{meal.strMeal}</h3>
      
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="text-white flex justify-center items-center"><strong className=" p-4">
            Watch On Youtube:</strong><FontAwesomeIcon icon={faYoutube} size="2x" className="text-red-600 hover:text-red-800"  />
            </a>
          </div>
          ))
      ) : (
        <p className="text-red-500 mt-12 font-extrabold text-6xl text-center">{error}</p>
      )}
      </div>

          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-3/4  overflow-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Meal Instructions</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul>
                    <li className="mb-4">{mealInstructions}</li>
                  </ul>

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

export default FoodSearch;