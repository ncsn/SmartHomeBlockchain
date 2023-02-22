/*npm install next react react-dom*/
import { useState } from "react";
import { Table } from 'semantic-ui-react';
import Layout from '../../components/layout/Layout';
import device from "../../ethereum/device";
import DeviceRow from "../../components/tables/DeviceRow";
import SearchBox from "../../components/tables/SearchBox";


function FirmwareIndex(props) {
    const [searchBox, setSearchBox] = useState('');
    const [listedOrderCount, setListedOrderCount] = useState('');
    const userAddress = sessionStorage.getItem("userAddress");
    const [firmwareLatest, setFirmwareLatest] = useState('');
    

    const onSearchChange = (event) => {
        setSearchBox(event.target[0].value);
    };
    
    function renderRows() {
        
        const filteredDevices = props.deviceInfos.filter((device) => {
            return device.deviceAddress
                .toLowerCase()
                .includes(searchBox.toLowerCase());
        });

        if (listedOrderCount !== filteredDevices.length) {
            setListedOrderCount(filteredDevices.length);
        }

        if (filteredDevices.length === 0) {
            return (
                <Table.Row>
                    <Table.Cell colSpan='9'>Nincs megjeleníthető adat.</Table.Cell>
                </Table.Row>
            )
        }

        var keys = new Array();
        var values = new Array();

        const data = '{"Vacuum": "2023021001","Xiaomi TV": "2023021002", "Tplink Router": "2023021003", "Samsung TV": "2023021004"}';

        keys = jsonFileReadKey(data, keys);
        values = jsonFileReadValue(data, values);

        var firmwareLatest = {};

        for (var i = 0; i < values.length; i++) {
            firmwareLatest[keys[i]] = values[i];
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

        return filteredDevices.map((device, index) => {
            return (
                <DeviceRow
                    key={index}
                    id={index}
                    name={device.name}
                    firmware={device.firmware}
                    deviceAddress={device.deviceAddress}
                    firmwareLatest={firmwareLatest[device.name]}

                />

                
            );
        })

    }
    if (userAddress === "0x92874F71A920821006F018be4086Ab6CDdf2aF6f".toLowerCase()) {
        return (
            <Layout>
                <div>
                    <SearchBox searchChange={onSearchChange} placeholder='Eszköz keresése...' />
                    <Table singleLine selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Eszköz neve</Table.HeaderCell>
                                <Table.HeaderCell>Firmware</Table.HeaderCell>
                                <Table.HeaderCell>Latest firmware</Table.HeaderCell>
                                <Table.HeaderCell colspan='9' textAlign='right'>Művelet</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {renderRows()}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='9'> {listedOrderCount} / {props.deviceCount} eszköz listázva</Table.HeaderCell>

                            </Table.Row>
                        </Table.Footer>

                    </Table>

                </div>
            </Layout>
        );
    }

}

FirmwareIndex.getInitialProps = async () => {
    
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
    return { deviceInfos, deviceCount };
    

}


export default FirmwareIndex;

