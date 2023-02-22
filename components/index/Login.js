import { useState, useEffect } from "react";
import { Form, Message, Image, Grid } from 'semantic-ui-react';
import LayoutAuth from '../layout/LayoutAuth';
import { Router } from "../../routes";

function Login() {

  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let userNameFromLocalStorage;

  useEffect(() => {
    getLocalStorage();

  }, []);

  async function getLocalStorage() {
    const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfoFromLocalStorage !== null)
      userNameFromLocalStorage = JSON.parse(localStorage.getItem("userInfo")).userName;

    if (userNameFromLocalStorage !== undefined)
      await setUserName(userNameFromLocalStorage);
  }

  async function connect(onConnected) {
    if (!window.ethereum) {
      setErrorMessage("Nincs Metamask telepítve.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    onConnected(accounts[0]);

    sessionStorage.setItem("userAddress", accounts[0]);
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    await connect(setUserAddress);

    const userInfo = {
      userAddress: sessionStorage.getItem("userAddress"),
      userName: userName
    };

    await localStorage.setItem("userInfo", JSON.stringify(userInfo));

    Router.reload();
  }

  return (
    <LayoutAuth>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Form onSubmit={onSubmit} error={!!errorMessage}
          size='large'>

          <Image
            src={'https://www.seekpng.com/png/full/21-212103_fox-head-png-fox.png'}
            size="medium"
            style={{marginBottom:"10%"}}
            centered
          />

          <Form.Input
            label='Hogyan hívhatlak?'
            type='text'
            placeholder='Adj meg egy becenevet'
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value)
            }
            }

          />

          <Message error content={errorMessage} />

          <Form.Button color="blue">Bejelentkezés</Form.Button>

        </Form>
      </Grid.Column>
    </Grid>

    </LayoutAuth >
  );

}

export default Login;
