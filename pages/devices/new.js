import React, { useState } from "react";
import Layout from '../../components/layout/Layout';
import { Form, Message, Dimmer, Loader } from 'semantic-ui-react';
import { Router } from "../../routes";
import web3 from '../../ethereum/web3';
import device from "../../ethereum/device";


function DeviceNew() {
  const [name, setName] = useState('');
  const [mac, setMacAddress] = useState('');
  const [firmware, setFirmwareId] = useState('');
  const [tipus, setTipus] = useState("Hálózati kábel");
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState('');
  const [display, setDisplay] = useState('none');



  const [active, setActive] = useState(false);

  const handleOpen = () => setActive(true);
  const handleClose = () => setActive(false);

  const uploadToClient = async (event) => {
    let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png','image/gif','image/bmp'];
    setErrorMessage("");
    if (event.target.files && event.target.files[0]) {
      let i = event.target.files[0];

      if(allowedExtension.indexOf(i.type)>-1) {
        if(i.size < 3000000) {
          setImage(i);
          //Megjeleníti a feltöltendő képet
          setCreateObjectURL(URL.createObjectURL(i));
          setDisplay('block');
        }
        else {
          setErrorMessage("3Mb-nál ne legyen nagyobb a kép!");
        }
      }
      else {
        setErrorMessage("Nem kép!");
      }

    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();    
    setErrorMessage("");      

    try {
      handleOpen();
      const accounts = await web3.eth.getAccounts();      
      const deviceItem = await device.methods
          .createDevice(name, mac, firmware, tipus)
            .send({ from: accounts[0] });

      const deviceCount = await device.methods.getDeviceCount().call();
      const lastDevice = await device.methods.deviceList(deviceCount-1).call();

      //kép feltöltés

      const body = new FormData();

      if(image.lastModifiedDate !== undefined) {
        const myNewFile = new File(
            [image],
            `${lastDevice}.png`,
            { type: image.type }
          );

        body.append("file", myNewFile);        

        const response = await fetch("/api/upload", {
          method: "POST",
          body
        });
      }
      else {
        console.log("Nincs mit feltölteni");
      }

      
    } catch (err) {
      setErrorMessage(err.message);
      handleClose();
    }
    handleClose();
    await Router.pushRoute("/devices");    
    
  };

    function handleChange(event) {
        setTipus(event.target.value);
    }


    return (
      <Layout>
      <h3>Új eszköz felvétele</h3>

      <Form onSubmit={onSubmit} style={{padding: "0 30%"}} error={!!errorMessage}>

      <img src={createObjectURL} style={{display : display}} width='300' height='300'/>

      <Form.Input
        label='Eszköz képe'
        type='file'
        onChange={uploadToClient}
        />

        <Form.Input
          label='Eszköz neve'
          type='text'
          placeholder='Eszköz neve'
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          />

        <Form.Input
          label='Mac Address'
          type='text'
          placeholder='Mac Address'
          value={mac}
          onChange={(event) =>
            setMacAddress(event.target.value)
          }
        />

        <Form.TextArea
            label='Firmware ID'
            type='text'
            placeholder='Firmware ID'
            value={firmware}
            onChange={(event) =>
                setFirmwareId(event.target.value)
            }
        />

        <div>
            <form>
                <h5> Áramellátás típusa </h5>
                <input
                    type="radio"
                    value="Hálózati kábel"
                    checked={tipus === "Hálózati kábel"}
                    onChange={handleChange}
                />
                Hálózati kábel
                <br />
                <input
                    type="radio"
                    value="Akkumulátor"
                    checked={tipus === "Akkumulátor"}
                    onChange={handleChange}
                />
                Akkumulátor
            </form>
            <br />
        </div>

       
               
        <Message error header="Hiba!" content={errorMessage} />
        <Form.Button color='green'>Új eszköz</Form.Button>
      </Form>

      <Dimmer active={active} page>
        <Dimmer.Dimmable as={Loader} size="big">
          Eszköz feltöltése folyamatban
        </Dimmer.Dimmable>
      </Dimmer>


      </Layout>
    );
  

}

export default DeviceNew;
