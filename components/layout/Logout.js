import { useState, useEffect } from "react";
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import {useRouter} from 'next/router';
import { Router } from "../../routes";

function Logout() {

  const [userAddress, setUserAddress] = useState();
  const [userName, setUserName] = useState();
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("userAddress") != null) {
      setUserAddress(sessionStorage.getItem("userAddress"));
      setUserName(JSON.parse(localStorage.getItem("userInfo")).userName);
    }    

    window.ethereum.on('accountsChanged', function (accounts) {
      sessionStorage.removeItem("userAddress"); 
      Router.pushRoute("/");  
    })

  }, []);
    

  const onLogout = async (event) => {
    event.preventDefault();
    sessionStorage.removeItem("userAddress");  
    if(router.pathname === '/') {
      Router.reload();
    }  
    else {
      Router.pushRoute("/");
    }       
  }

  return (
    <Menu.Item as='a' className="item">
            <Icon name='spy' /> 
    
    
      <Dropdown
        trigger={userName}
        pointing='top right'
        icon={null}>
        <Dropdown.Menu>
          <Dropdown.Item
            key='userAddress'
            text={userAddress}
            icon='spy'
          />
          <Dropdown.Item
            key='logout'
            text='Kijelentkezés'
            icon='sign out'
            onClick={onLogout}
          />
        </Dropdown.Menu>

      </Dropdown>
    </Menu.Item>


  );
}

export default Logout;
