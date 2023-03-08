/*npm install next react react-dom*/
import { useState } from "react";
import { Table, Button, Icon, Card } from 'semantic-ui-react';
import Layout from '../../components/layout/Layout';
import { Link } from "../../routes";
import device from "../../ethereum/device";
import DeviceRow from "../../components/tables/DeviceRow";
import SearchBox from "../../components/tables/SearchBox";
import UserCards from "../../components/tables/UserCards";


function DeviceIndex(props) {
    const [searchBox, setSearchBox] = useState('');
    const [listedDeviceCount, setListedDeviceCount] = useState('');

    const userAddress = sessionStorage.getItem("userAddress");


    const onSearchChange = (event) => {
        setSearchBox(event.target[0].value);
    };

    function renderRows() {
        let filteredDevices;
        if (searchBox.startsWith('0x')) {
            filteredDevices = props.deviceInfos.filter((device) => {
                return device.productAddress
                    .toLowerCase()
                    .includes(searchBox.toLowerCase());
            });
        }
        else {
            filteredDevices = props.deviceInfos.filter((device) => {
                return device.name
                    .toLowerCase()
                    .includes(searchBox.toLowerCase());
            });
        }

        if (listedDeviceCount !== filteredDevices.length) {
            setListedDeviceCount(filteredDevices.length);
        }

        if (userAddress === "0x92874F71A920821006F018be4086Ab6CDdf2aF6f".toLowerCase()) {
            if (filteredDevices.length === 0) {
                return (
                    <Table.Row>
                        <Table.Cell colSpan='7'>Nincs megjeleníthető adat.</Table.Cell>
                    </Table.Row>
                )
            }

            return filteredDevices
                .map((device, index) => {
                    return (
                        <DeviceRow
                            key={index}
                            id={index}
                            name={device.name}
                            mac={device.mac}
                            firmware={device.firmware}
                            tipus={device.tipus}
                            status={device.status}
                            deviceAddress={device.deviceAddress}
                            owner={device.owner}
                        />
                    )
                });
        }
        else {
            if (filteredDevices.length === 0) {
                return (
                    <div style={{ marginTop: "3%" }}>
                        Nincs megjeleníthető adat.
                    </div>
                )
            }
            return filteredDevices
                .map((device, index) => {
                    return (
                        <UserCards
                            key={index}
                            id={index}
                            name={device.name}
                            mac={device.mac}
                            firmware={device.firmware}
                            tipus={device.tipus}
                            status={device.status}
                            deviceAddress={device.deviceAddress}
                            owner={device.owner}
                        />
                    )
                });
        }

    }

    if (userAddress === "0x92874F71A920821006F018be4086Ab6CDdf2aF6f".toLowerCase()) {
        return (
            <Layout>
                <SearchBox searchChange={onSearchChange} placeholder='Eszköz keresése...' />
                <Table singleLine selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Eszköz neve</Table.HeaderCell>
                            <Table.HeaderCell>Státusz</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>Művelet</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {renderRows()}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7'> {listedDeviceCount} / {props.deviceCount} eszköz listázva</Table.HeaderCell>

                        </Table.Row>
                    </Table.Footer>

                </Table>
                <Link route="/devices/new">
                    <Button icon labelPosition='left' floated='right' color='#77797A'>
                        <Icon name='add circle' />
                        Eszköz hozzáadása
                    </Button>
                </Link>
            </Layout>
        );
    }
    else {
        return (
            <Layout>
                <SearchBox searchChange={onSearchChange} placeholder='Eszköz keresése...' />
                <Card.Group>{renderRows()}</Card.Group>
            </Layout>
        );
    }
}

DeviceIndex.getInitialProps = async () => {
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


export default DeviceIndex;

