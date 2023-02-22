import web3 from './web3';
import Device from './build/Device.json';

const instance = new web3.eth.Contract(
  JSON.parse(Device.interface),
    '0x8ec3825Ab797417b591f3D1785FbFb8Fb4A5b39a'

);

export default instance; 
