import { useState } from "react";
import Layout from '../../components/layout/Layout';
import { Button, Form, Message, Image, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { Link, Router } from "../../routes";
import web3 from '../../ethereum/web3';
import device from "../../ethereum/device";


function DeviceEdit(props) {
  const [name, setName] = useState(props.deviceItem.name);
  const [mac, setMacAddress] = useState(props.deviceItem.mac);
  const [firmware, setFirmwareId] = useState(props.deviceItem.firmware);
  const [tipus, setTipus] = useState(props.deviceItem.tipus);
  const [status, setStatus] = useState(props.deviceItem.status);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState(`/deviceImages/${props.deviceItem.deviceAddress}.png`);

  const [active, setActive] = useState(false);

  const handleOpen = () => setActive(true);
  const handleClose = () => setActive(false);

  const uploadToClient = async (event) => {
    let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    if (event.target.files && event.target.files[0]) {
      let i = event.target.files[0];

      if (allowedExtension.indexOf(i.type) > -1) {
        if (i.size < 3000000) {
          setImage(i);
          //Megjeleníti a feltöltendő képet          
          setCreateObjectURL(URL.createObjectURL(i));
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
    setLoading(true);
    setErrorMessage("");

    try {
      handleOpen();
      const accounts = await web3.eth.getAccounts();

        const deviceItem = await device.methods
        .updateDevice(props.deviceItem.deviceAddress, name, mac, firmware, tipus, status)
        .send({ from: accounts[0] });

      //kép feltöltés
      const body = new FormData();

      if (image.lastModifiedDate !== undefined) {
        const myNewFile = new File(
          [image],
         `${props.deviceItem.deviceAddress}.png`,
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
    setLoading(false);
  };

    function handleChange(event) {
        setTipus(event.target.value);
    }

    function handleChange2(event) {
        setStatus(event.target.value);
    }


  return (
    <Layout>
      <h3>Eszköz adatainak szerkesztése</h3>
      <Link route="/devices/">
          <Button animated>
              <Button.Content visible>Vissza</Button.Content>
              <Button.Content hidden>
                  <Icon name='arrow left' />
              </Button.Content>
          </Button>
      </Link>

      <Form onSubmit={onSubmit} loading={loading} style={{ padding: "0 30%" }} error={!!errorMessage}>

        <Image src={createObjectURL} width='300' height='300' />


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

        <Form.TextArea
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


        <div>
            <form>
                <h5> Státusz </h5>
                <input
                    type="radio"
                    value="Up"
                    checked={status === "Up"}
                    onChange={handleChange2}
                />
                Up
                <br />
                <input
                    type="radio"
                    value="Down"
                    checked={status === "Down"}
                    onChange={handleChange2}
                />
                Down
            </form>
            <br />
        </div>
        


        <Message error header="Hiba!" content={errorMessage} />
        <Form.Button color='green'>Frissítés</Form.Button>
      </Form>

      <Dimmer active={active} page>
        <Dimmer.Dimmable as={Loader} size="big">
          Eszköz szerkesztése folyamatban
        </Dimmer.Dimmable>
      </Dimmer>


    </Layout>
  );

}

DeviceEdit.getInitialProps = async (props) => {
    const deviceItem = await device.methods.devices(props.query.address).call();

    return { deviceItem };
}

export default DeviceEdit;
