
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {faGithub}  from '@fortawesome/free-brands-svg-icons';

import {faFacebook}  from '@fortawesome/free-brands-svg-icons';
function Footer(){

  
  
    return(
        <div  className=" bg-gray-900  ">
      
        <footer className=" pt-2 ml-2 mb-2 mr-6 justify-between items-center flex" >
        <h1 className="text-white text-1xl font-sans  p-4 flex items-left">Copyright © 2024 Tahira Mohammadi

</h1>
           <div className=" p-4 flex items-right">
           <FontAwesomeIcon icon={faLinkedinIn} size="2x" className="text-white text-1xl p-2"  />
           <FontAwesomeIcon icon={faGithub} size="2x" className="text-white text-1xl p-2"  />
           <FontAwesomeIcon icon={faFacebook} size="2x" className="text-white text-1xl p-2"  />
           </div>
        </footer>
      
    
     
              </div>
    );

    
}

export default Footer;
