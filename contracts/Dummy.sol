pragma solidity ^0.5.0;

contract Dummy {
  address public owner;
  
  constructor() public {
    owner = msg.sender;
  }
}
