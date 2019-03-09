import clientConfig from '../config/client.json';
import FirestarterConfig from '../contracts/Firestarter.json';

const { network } = clientConfig;

export const fireStarterContractAddress = FirestarterConfig.networks[network].address;
export const FirestarterContract = () => new window._web3.eth.Contract(FirestarterConfig.abi, fireStarterContractAddress); // eslint-disable-line
