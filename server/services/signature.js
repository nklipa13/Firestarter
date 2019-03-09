const sigUtil = require('eth-sig-util');

module.exports.isValidSignature = (address, sig, message) => {
  const msgParams = [{
    type: 'string',
    name: 'Message',
    value: message,
  }];

  const recovered = sigUtil.recoverTypedSignature({
    data: msgParams,
    sig,
  });

  return address.toString().toLowerCase() === recovered.toString().toLowerCase();
};
