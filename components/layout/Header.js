import { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "../../routes";
import Logout from './Logout';
import userValidate from "../validate/userValidate";

const Header = () => {
  const [devices, setDevices] = useState('item');
  const [firmwares, setFirmwares] = useState('item');
  const [customers, setCustomers] = useState('item');
  let x = window.location.pathname;

  useEffect(() => {
    if (x.startsWith('/devices')) { setDevices('item selected'); setFirmwares('item');  setCustomers('item'); }
    else if (x.startsWith('/firmwares')) { setDevices('item'); setFirmwares('item selected'); setCustomers('item'); }
    else if (x.startsWith('/customers')) { setDevices('item'); setFirmwares('item');  setCustomers('item selected'); }
    else { setDevices('item'); setFirmwares('item'); setCustomers('item'); }

  }, []);

  if (userValidate()) {
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">
            <img src='/favicon.png' height='30px' width='30px' />
          </a>
        </Link>


        <Menu.Menu position="left">

          <Link route="/devices">

             <Menu.Item as='a' className={devices}>
              <Icon name='computer' /> Eszközök
            </Menu.Item>
          </Link>
          <Link route="/firmwares">
            <Menu.Item as='a' className={firmwares}>
              <Icon name='download' /> Firmware Update
            </Menu.Item>
          </Link>
               
        </Menu.Menu>

        <Menu.Menu position="right">
          
            <Logout />
          
        </Menu.Menu>

      </Menu>

    );
  }
  else {
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">
            <img src='/favicon.png' height='30px' width='30px' />
          </a>
        </Link>

        <Menu.Menu position="right">
          <Logout />
        </Menu.Menu>

      </Menu>

    );
  }

};

export default Header;
