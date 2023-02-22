import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // A böngészőben vagyunk, és fut a MetaMask.
  //window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // Szerveren vagyunk, vagy nem fut a MetaMask
  const provider = new Web3.providers.HttpProvider(
    'https://sepolia.infura.io/v3/78d09edca1dd4ec0a008ddf766b40d61'
  );
  web3 = new Web3(provider);
}

export default web3;
