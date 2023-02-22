/*npm install next react react-dom*/
import { useState, useEffect } from "react";
import Login from '../components/index/Login';
import IndexAdmin from '../components/index/IndexAdmin';
import IndexUser from '../components/index/IndexUser';
import userValidate from "../components/validate/userValidate";

function MainIndex() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {    
    const userAddress = sessionStorage.getItem("userAddress");
    if(userAddress !== null && userAddress !== undefined) {
      if(userValidate()) {
        setAdminLoggedIn(true);
      }        
      setLoggedIn(true);  
      
    }        
  }, []);
  
  return (    
    <>
      {loggedIn ? (adminLoggedIn ? <IndexAdmin /> : <IndexUser />) : <Login />}
    </>
  );
}

export default MainIndex;
