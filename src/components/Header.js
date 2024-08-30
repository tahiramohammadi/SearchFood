import logo from '../Food.jpg'



function Header(){

  
  
    return(
  
        <div  className="flex justify-between">
      
        <header className="flex items-start pt-2 ml-2 mb-2 mr-6" >
        <img src={logo} alt="Food Logo"  className="h-20 w-20 max-w-xs rounded-full mx-auto mr-4"/>
        <h1 className="text-yellow-500 text-7xl pt-1 font-bold  font-sans"> Test Food with Us</h1>
        </header>
                   
      
         
              </div>

    );

    
}

export default Header;




