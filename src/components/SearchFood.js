import React, { useState , useEffect} from 'react';
import axios from 'axios';
import MealDialog from './MealDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';


const FoodSearch = () => {
  const [meals, setMeals] = useState([]);
  const [name, setName]= useState('');
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);

  const openDialog = (mealId) => {
      setSelectedMealId(mealId);
      setIsDialogOpen(true);
  };

  const closeDialog = () => {
      setIsDialogOpen(false);
      setSelectedMealId(null);
  };



    const fetchFoods = async () => {
 
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
        }
    };

    useEffect(() => {
      fetchFoods(); // This will run once when the component mounts
    }, []);



    const filteredMeals = meals?.filter((meal) =>
    meal.strMeal.toLowerCase().includes(name.toLowerCase())
  );
 
   
  

  

    return(
  
        <div className="bg-black  pl-16  pr-16 pb-16">
               <div className="text-yellow-500 text-4xl  p-16 font-extrabold text-center">Search For a Meal</div>
                <div className="flex">
        <input className="p-4 rounded-l-lg   w-5/6 md:w-full outline-none focus:bg-white"  placeholder="Search your recipie here.." 
        value={name}
        onChange={(e) =>setName(e.target.value)}/>
        <button className="text-yellow-500  p-4 rounded-r-lg  bg-gray-900" onClick={ fetchFoods}> Search</button>
     
        </div>
    
      
      

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-12  ">
        {filteredMeals && filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
          <div key={meal.idMeal} className="border rounded-lg overflow-hidden shadow-lg ">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover cursor-pointer"
            onClick={() => openDialog(meal.idMeal)}
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

      <MealDialog
                mealId={selectedMealId}
                isOpen={isDialogOpen} // This should be a boolean, not a function
                onClose={closeDialog}
            />
          </div>
                

    
    );

}

export default FoodSearch;