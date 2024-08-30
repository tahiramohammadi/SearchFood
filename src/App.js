
import barger from './barger.avif'
import Header from './components/Header'
import SearchFood from './components/SearchFood'
 import Footer from './components/Footer'

function App() {

  return (
    <div className="bg-black h-screen">
      <Header/>
      
    <div  className="grid grid-cols-2 ">
    
        <div  className="mt-20 ml-20"> <h1  className="text-white text-4xl font-extrabold p-4">Online Food Ordering System
                </h1>
               <p  className="text-gray-400 p-4 text-2xl  space-y-4 ">Multi-Purpose, Multi-Lingual, Multi-Store, Multi-Currency for Hospitality, Caterers, Hotels, Airports, Hospitals, Events...  
Direct, efficient, fully owned sales and engagement with customers across different Hospitality functions.</p>
</div>
<div>
      <img src={barger} alt="food barger"  className="ml-auto h-auto max-w-2xl" />
      </div>
      </div>
  
     
               <SearchFood/>
       
          <Footer/>
 
    </div>

  
  );
}

export default App;
