var Dummy = artifacts.require("./Dummy.sol");

module.exports = function(deployer) {
  deployer.deploy(Dummy);
};
