import web3 from './web3';
import Firmware from './build/Firmware.json';

const instance = new web3.eth.Contract(
    JSON.parse(Firmware.interface),
    '0xf40D7278d82b0Ca2F532F8c3adbeF809B58fdFD6'
);

export default instance;
