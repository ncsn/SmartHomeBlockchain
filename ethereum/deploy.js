const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledDevice = require('./build/Device.json');
const compiledFirmware = require('./build/Firmware.json');

const provider = new HDWalletProvider(
  'evoke dilemma income box decorate way helmet member divide alcohol deal lobster',
  // remember to change this to your own phrase!
    'https://sepolia.infura.io/v3/78d09edca1dd4ec0a008ddf766b40d61'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const resultDevice = await new web3.eth.Contract(
    JSON.parse(compiledDevice.interface)
  )
    .deploy({ data: compiledDevice.bytecode })
    .send({ gas: '10000000', from: accounts[0] });

  console.log('Device contract deployed to', resultDevice.options.address);

  const resultFirmware = await new web3.eth.Contract(
    JSON.parse(compiledFirmware.interface)
  )
    .deploy({ data: compiledFirmware.bytecode })
    .send({ gas: '10000000', from: accounts[0] }); 

  console.log('Firmware contract deployed to', resultFirmware.options.address);
  provider.engine.stop();
};
deploy();
