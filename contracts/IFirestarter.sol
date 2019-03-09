pragma solidity ^0.5.0;

contract IFirestarter {
    function getNewBalanceAndRateView(uint _id) public view returns(uint, uint);
    function userFundedProject(uint _projectId, address _user) public view returns(uint);
}