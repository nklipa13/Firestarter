pragma solidity ^0.5.0;

contract CompoundInterface {
    function supply(address asset, uint amount) public returns (uint);
    function withdraw(address asset, uint requestedAmount) public returns (uint);
    function borrow(address asset, uint amount) public returns (uint);
    function repayBorrow(address asset, uint amount) public returns (uint);
    function getAccountLiquidity(address account) public view returns (int);
    function getSupplyBalance(address account, address asset) public view returns (uint);
    function getBorrowBalance(address account, address asset) public view returns (uint);
}