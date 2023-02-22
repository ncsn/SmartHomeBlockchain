import { useState, useEffect } from "react";
import { Table, Button, Dimmer, Loader } from "semantic-ui-react";
import { Link, Router } from "../../routes";
import web3 from '../../ethereum/web3';
import device from "../../ethereum/device";
import firmware from "../../ethereum/firmware";
import UserCards from "./UserCards";


function DeviceRow(props) {
    const { Row, Cell } = Table;
    const { deviceAddress, owner } = props;
    const [name, setName] = useState(props.name);
    const [mac, setMacAddress] = useState(props.mac);
    const [firmware, setFirmwareId] = useState(props.firmware);
    const [tipus, setTipus] = useState(props.tipus);
    const [status, setStatus] = useState(props.status);
    const [userAddress, setUserAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [active, setActive] = useState(false);
    const handleOpen = () => setActive(true);
    const handleClose = () => setActive(false);
    const [firmwareLatest, setFirmwareLatest] = useState(props.firmwareLatest);

    let color;
    if (firmware === firmwareLatest) {
        color = 'lightgreen';
    }
    else {
        color = '#FF4A4A';
    }

    useEffect(() => {
        const address = sessionStorage.getItem("userAddress");
        if (userAddress !== null)
            setUserAddress(address);

    }, []);

    const onDelete = async (event) => {
        event.preventDefault();

        if (confirm(`Biztosan törölni akarod a(z) ${name} nevű eszközt?`)) {
            try {
                handleOpen();
                const accounts = await web3.eth.getAccounts();
                const deviceItem = await device.methods
                    .deleteDevice(props.deviceAddress)
                    .send({ from: accounts[0] });

            } catch (err) {
                console.error(err);
                handleClose();
            }
        }
        handleClose();
        Router.pushRoute("/devices");
    };


    if (userAddress === owner?.toLowerCase()) {
        return (
            <Row>
                <Cell>{props.id + 1}</Cell>
                <Cell>{name}</Cell>
                <Cell>{status}</Cell>
                <Cell textAlign='right'>
                    <Link route={`/devices/${deviceAddress}`}>
                        <Button title="Eszköz adatai" icon='eye' primary />
                    </Link>
                    <Link route={`/devices/${deviceAddress}/edit`}>
                        <Button title="Eszköz adatainak szerkesztése" icon='pencil' />
                    </Link>
                    <Button title="Eszköz adatainak törlése" icon='trash alternate' color='red' onClick={onDelete} />
                </Cell>

                <Dimmer active={active} page>
                    <Dimmer.Dimmable as={Loader} size="big">
                        Eszköz törlése folyamatban
                    </Dimmer.Dimmable>
                </Dimmer>

            </Row>

        );
    }
    else {

        return (

            <Row style={{ backgroundColor: color }}>
                <Cell>{props.id + 1}</Cell>
                <Cell>{name}</Cell>
                <Cell>{firmware}</Cell>
                <Cell>{firmwareLatest}</Cell>
                <Cell textAlign='right'>
                    <Link route={`/firmwares/${deviceAddress}/sync`}>
                        <Button title="Szinkronizálás" icon='refresh' color='blue' />
                    </Link>
                </Cell>

                <Dimmer active={active} page>
                    <Dimmer.Dimmable as={Loader} size="big">
                        Eszköz frissítése folyamatban
                    </Dimmer.Dimmable>
                </Dimmer>
            </Row>

        );
    }

    return (
        <UserCards />
    );
}

DeviceRow.getInitialProps = async (props) => {
    const deviceItem = await device.methods.devices(props.query.address).call();
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

    return { deviceItem, deviceAddresses, deviceInfos };
}


export default DeviceRow;