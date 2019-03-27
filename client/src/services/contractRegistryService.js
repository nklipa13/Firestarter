import clientConfig from '../config/client.json';
import fixedContracts from '../config/fixedContracts.json';
import FirestarterConfig from '../contracts/Firestarter.json';
import VotingMachineCallback from '../contracts/VotingMachineCallback.json';
import { setupWeb3 } from './web3Service';

setupWeb3();

const { network } = clientConfig;

export const fireStarterContractAddress = FirestarterConfig.networks[network].address;
export const FirestarterContract = () => new window._web3.eth.Contract(FirestarterConfig.abi, fireStarterContractAddress); // eslint-disable-line

export const daiErc20Address = fixedContracts.DaiErc20.networks[clientConfig.network].address;
export const DaiErc20Contract = () => new window._web3.eth.Contract(fixedContracts.DaiErc20.abi, daiErc20Address);

export const VotingMachineContract = address => new window._web3.eth.Contract(VotingMachineCallback.abi, address);
