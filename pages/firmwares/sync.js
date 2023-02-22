import { useState, useEffect } from "react";
import Layout from '../../components/layout/Layout';
import { Button, Form, Icon, Message, Dimmer, Loader } from 'semantic-ui-react';
import { Link, Router } from "../../routes";
import web3 from '../../ethereum/web3';
import device from "../../ethereum/device";
import DeviceRow from "../../components/tables/DeviceRow";


function FirmwareSync(props) {
    const { deviceAddress, setDeviceAddress } = props;
    const [firmware, setFirmwareId] = useState(props.deviceItem.firmware);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    
    var keys = new Array();
    var values = new Array();

    const data = '{"Vacuum": "2023021001","Xiaomi TV": "2023021002", "Tplink Router": "2023021003", "Samsung TV": "2023021004"}';

    keys = jsonFileReadKey(data, keys);
    values = jsonFileReadValue(data, values);

    var firmwareLatestValues = {};

    for (var i = 0; i < values.length; i++) {
        firmwareLatestValues[keys[i]] = values[i];
        
    }

    function jsonFileReadKey(data, keys) {
        var keys = new Array();
        var splited = data.split(',');
        var hossz = splited.length;
        var key = splited[0].split('"');
        keys.push(key[1]);
        for (var i = 1; i < hossz; i++) {
            var key = splited[i]?.split('"');
            keys.push(key[1]);
        }
        return keys;
    }

    function jsonFileReadValue(data, values) {
        var values = new Array();
        var splited = data.split(',');
        var hossz = splited.length;
        var key = splited[0].split('"');
        values.push(key[3]);

        for (var i = 1; i < hossz; i++) {
            var key = splited[i].split('"');
            values.push(key[3]);
        }
        return values;
    }
    const [firmwareLatest, setFirmwareLatest] = useState(firmwareLatestValues[props.deviceItem.name]);
    
    const [active, setActive] = useState(false);

    const handleOpen = () => setActive(true);
    const handleClose = () => setActive(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (confirm(`Biztosan szinkronizálni akarod a(z) ${props.deviceItem.name} nevű eszközt?`)) {
            try {
                handleOpen();
                const accounts = await web3.eth.getAccounts();
                const deviceItem = await device.methods
                    .updateFirmware(props.deviceItem.deviceAddress, firmwareLatest)
                    .send({ from: accounts[0] });
            } catch (err) {
                setErrorMessage(err.message);
                handleClose();
            }
        }
        handleClose();
        await Router.pushRoute("/firmwares");
        setLoading(false);
    };



    return (
        <Layout>
            <h3>Szinkronizálás</h3>
            <Link route="/firmwares/">
                <Button animated>
                    <Button.Content visible>Vissza</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
            </Link>
            
            <Form onSubmit={onSubmit} loading={loading} style={{ padding: "0 30%" }} error={!!errorMessage}>

                <Form.Input
                    label='Firmware'
                    type='text'
                    placeholder='Firmware'
                    value={firmware}
                    disabled
                    onChange={(event) =>
                        setFirmwareId(firmwareLatest)
                    }
                />

                <Form.Input
                    label='Latest Firmware'
                    type='text'
                    placeholder='Latest Firmware'                     
                    value={firmwareLatest}
                    disabled
                />

                <Message error header="Hiba!" content={errorMessage} />
                <Form.Button loading={loading} color='green'>Szinkronizálás</Form.Button>

                <Dimmer active={active} page>
                    <Dimmer.Dimmable as={Loader} size="big">
                        Eszköz frissítése folyamatban
                    </Dimmer.Dimmable>
                </Dimmer>
            </Form>


        </Layout>
    );

}

FirmwareSync.getInitialProps = async (props) => {
    const deviceItem = await device.methods.devices(props.query.address).call();
    const deviceCount = await device.methods.getDeviceCount().call();
    const deviceAddresses = await Promise.all(
        Array(parseInt(deviceCount))
            .fill()
            .map((address, index) => {
                return device.methods.deviceList(index).call();
            })
    );

    const deviceInfos = await Promise.all(
        Array(parseInt(deviceCount))
            .fill()
            .map((index, id) => {
                return device.methods.devices(deviceAddresses[id]).call();
            })
    );

    return { deviceItem, deviceAddresses, deviceInfos};
}

export default FirmwareSync;