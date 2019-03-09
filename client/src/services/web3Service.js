import Web3 from 'web3';
import clientConfig from '../config/client.json';

export const setWeb3toMetamask = () => {
  window._web3 = new Web3(web3.currentProvider);
};

export const setupWeb3 = () => {
  window._web3 = new Web3(clientConfig.provider);
};
