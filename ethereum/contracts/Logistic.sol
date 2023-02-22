pragma solidity ^0.4.26;

contract Firmware {
    address public manager;

    struct OrderData {
        address product;
        address customer;
        address orderAddress;
        string name;
        string firmware;
    }

    mapping(address => OrderData) public orders;
    address[] public orderList;

    constructor() public {
        manager = msg.sender;
    }
   
    function getOrderCount() public constant returns(uint orderCount) {
        return orderList.length;
    }

    function newOrder(address product, address customer, string name, string firmware) public returns (uint rowNumber) {
        address orderAddress = address(keccak256(abi.encodePacked(now)));
        orders[orderAddress].customer = customer;
        orders[orderAddress].product = product;
        orders[orderAddress].orderAddress=orderAddress;
        orders[orderAddress].name = name;
        orders[orderAddress].firmware = firmware;

        return orderList.push(orderAddress) - 1;
    }


  function indexOf(address searchFor) public view returns (uint256) {
    for (uint256 i = 0; i < orderList.length; i++) {
      if (orderList[i] == searchFor) {
        return i;
      }
    }
    revert("Not Found");
  }

  function remove(uint index) public returns(address[]) {
        if (index >= orderList.length) return;

        for (uint i = index; i<orderList.length-1; i++){
            orderList[i] = orderList[i+1];
        }
        delete orderList[orderList.length-1];
        orderList.length--;
        return orderList;
    }

}

contract Device {
    address public manager;

    struct DeviceData {
        string name;
        string mac;
        string firmware;
        string firmwareLatest;
        string tipus;
        string status;
        address owner;
        address deviceAddress;

    }

    mapping(address => DeviceData) public devices;
    address[] public deviceList;

    constructor() public {
        manager = msg.sender;
    }

    function getDeviceCount() public constant returns(uint deviceCount) {
        return deviceList.length;
    }

    function createDevice(string name, string mac, string firmware, string tipus) public returns (uint rowNumber)  {
        address deviceAddress = address(keccak256(abi.encodePacked(now)));
        devices[deviceAddress].name = name;
        devices[deviceAddress].mac = mac;
        devices[deviceAddress].firmware = firmware;
        devices[deviceAddress].tipus = tipus;
        devices[deviceAddress].status = 'Up';
        devices[deviceAddress].owner = manager;
        devices[deviceAddress].deviceAddress = deviceAddress;

        return deviceList.push(deviceAddress) - 1;
    }

    function updateDevice(address deviceAddress, string name, string mac, string firmware, string tipus, string status) public returns(bool success) {
        devices[deviceAddress].name = name;
        devices[deviceAddress].mac = mac;
        devices[deviceAddress].firmware = firmware;
        devices[deviceAddress].tipus = tipus;
        devices[deviceAddress].status = status;

        return true;
  }

  function updateFirmware(address deviceAddress, string firmware) public returns(bool success){
        devices[deviceAddress].firmware = firmware;
        
        return true;
  }

    function indexOf(address searchFor) private view returns (uint256) {
    for (uint256 i = 0; i < deviceList.length; i++) {
      if (deviceList[i] == searchFor) {
        return i;
      }
    }
    revert("Not Found");
  }
  function remove(uint index) private returns(address[]) {
        if (index >= deviceList.length) return;

        for (uint i = index; i<deviceList.length-1; i++){
            deviceList[i] = deviceList[i+1];
        }
        delete deviceList[deviceList.length-1];
        deviceList.length--;
        return deviceList;
    }

  function deleteDevice(address deviceAddress) public {
        delete devices[deviceAddress];
        remove(indexOf(deviceAddress));
    }
}