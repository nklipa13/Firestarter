import {
  DaiErc20Contract,
  FirestarterContract,
  fireStarterContractAddress,
} from './contractRegistryService';

export const weiToEth = weiVal => window._web3.utils.fromWei(weiVal);

export const ethToWei = ethVal => window._web3.utils.toWei(`${ethVal}`);

export const getNetwork = () => window._web3.eth.net.getId();

/**
 * Returns name of Ethereum network for given ID
 *
 * @return {String}
 */
export const nameOfNetwork = (networkId) => {
  const networks = {
    1: 'Mainnet',
    3: 'Ropsten',
    4: 'Rinkedby',
    42: 'Kovan',
  };
  return networks[networkId] || 'Unknown network';
};

/**
 * Checks if the user has approved to use MM as the provider
 *
 * @return {Promise<*>}
 */
export const isEthereumApproved = async () => {
  if (!window.ethereum || !window.ethereum.enable) return true;
  if (window.ethereum._metamask && window.ethereum._metamask.isApproved) return window.ethereum._metamask.isApproved();

  const acc = await window.web3.eth.getAccounts();

  return !!acc.length;
};

export const ethereumEnable = async () => {
  try {
    if (window.ethereum) return window.ethereum.enable();
  } catch (e) {
    throw new Error(e);
  }
};

export const getAccount = () => (
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await window._web3.eth.getAccounts();
      if (!accounts.length) throw new Error('No accounts (Possibly locked)');
      resolve(accounts[0]);
    } catch (err) {
      reject(err);
    }
  })
);

export const getBalance = async (_account) => {
  const account = _account || await getAccount();
  const balanceWei = await window._web3.eth.getBalance(account);
  const balanceEth = window._web3.utils.fromWei(balanceWei);
  // optionally convert to BigNumber here
  // return new window._web3.utils.BN(balanceEth);
  return balanceEth;
};

export const startProjectContractCall = (sendTxFunc, from, name) => new Promise(async (resolve, reject) => {
  try {
    const contract = await FirestarterContract();

    const promise = contract.methods['addProject(string)'](name).send({ from });
    const receipt = await sendTxFunc(promise);

    resolve(window._web3.utils.hexToNumber(receipt.logs[0].topics[1]));
  } catch (err) {
    reject(err);
  }
});

export const oneTimeFundContractCall = (sendTxFunc, from, projectId, _amount) => new Promise(async (resolve, reject) => { // eslint-disable-line
  try {
    const contract = await FirestarterContract();
    const value = window._web3.utils.toWei(_amount, 'ether');

    const promise = contract.methods.fundProjectDirectly(projectId).send({ from, value });

    await sendTxFunc(promise);

    resolve(true);
  } catch (err) {
    reject(err);
  }
});

export const vestFundContractCall = (sendTxFunc, from, projectId, _amount, weeks) => new Promise(async (resolve, reject) => { // eslint-disable-line
  try {
    const contract = await FirestarterContract();
    const value = window._web3.utils.toWei(_amount, 'ether');
    const numBlocks = (parseInt(weeks, 10) * 604800) / 15;
    const promise = contract.methods.fundProjectByVesting(projectId, numBlocks).send({ from, value });

    await sendTxFunc(promise);

    resolve(true);
  } catch (err) {
    reject(err);
  }
});

/**
 * Gets dai allowance for the users address from the dai erc20 contract
 *
 * @param address {String}
 * @return {Promise<Number>}
 */
export const getDaiAllowance = address => new Promise(async (resolve, reject) => {
  const contract = await DaiErc20Contract();

  try {
    const data = await contract.methods.allowance(address, fireStarterContractAddress).call();

    resolve(parseFloat(weiToEth(data)));
  } catch (err) {
    reject(err);
  }
});

/**
 * Approves that dai can be used for the users address on the dai erc20 contract
 *
 * @param address {String}
 * @param sendTxFunc {Function}
 * @return {Promise<Boolean>}
 */
export const approveDai = (sendTxFunc, address) => new Promise(async (resolve, reject) => {
  const contract = await DaiErc20Contract();

  const num = ethToWei(Number.MAX_SAFE_INTEGER.toString());

  try {
    const promise = contract.methods.approve(fireStarterContractAddress, num).send({ from: address });
    await sendTxFunc(promise);

    resolve(true);
  } catch (err) {
    reject(err);
  }
});

export const compoundFundContractCall = (sendTxFunc1, sendTxFunc2, from, projectId, _amount) => new Promise(async (resolve, reject) => { // eslint-disable-line
  try {
    const contract = await FirestarterContract();
    const value = window._web3.utils.toWei(_amount, 'ether');

    const daiAllowance = await getDaiAllowance(from);
    if (daiAllowance === 0) await approveDai(sendTxFunc1, from);

    const promise2 = contract.methods.fundProjectByCompound(projectId, value).send({ from });
    await sendTxFunc2(promise2);

    resolve(true);
  } catch (err) {
    reject(err);
  }
});

export const getMaxEthDaiForProject = id => new Promise(async (resolve, reject) => {
  try {
    const contract = await FirestarterContract();

    const res = await contract.methods.getMaxWithdraws(id).call();
    console.log('res', res);

    resolve({ maxDai: parseFloat(window._web3.utils.fromWei(res.maxDai)), maxEth: parseFloat(window._web3.utils.fromWei(res.maxEth)) }); // eslint-disable-line
  } catch (err) {
    reject(err);
  }
});

export const projectWithdrawContractCall = (sendTxFunc, from, projectId, formData) => new Promise(async (resolve, reject) => { // eslint-disable-line
  try {
    const contract = await FirestarterContract();
    const ethAmount = window._web3.utils.toWei(formData.ethAmount, 'ether');
    const daiAmount = window._web3.utils.toWei(formData.daiAmount, 'ether');

    console.log('ethAmount', ethAmount);
    console.log('ethAmount', daiAmount);

    const promise = contract.methods.withdraw(projectId, ethAmount, daiAmount, formData.purpose).send({ from });
    //
    // await sendTxFunc(promise);

    resolve(true);
  } catch (err) {
    reject(err);
  }
});
