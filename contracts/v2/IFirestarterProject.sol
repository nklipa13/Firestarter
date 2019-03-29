pragma solidity ^0.5.0;

import "./Vesting.sol";
import "./CompoundInterface.sol";
import "./ERC20.sol";

contract IFirestarterProject is Vesting {

	enum FundType { DirectType, VestingType, CompoundType }

	struct Withdraw {
		uint ethAmount;
		uint daiAmount;
		string message;
	}

	struct Fund {
		uint amount;
		FundType fundType;
		uint start;
		uint canceled;
		uint end;
	}

	address payable public manager;
	address public owner;
	string public name;
	uint public id;
	uint public HOUSE_COMMISSION;

	uint public totalFunds;
	uint public currentDaiFunds;
	
	mapping(address => Fund[]) public allFunds;
	// solidity doesn't support array of structs in struct, so implementing it on my own
	mapping(uint => Withdraw) public allWithdraws;
	
	uint public totalWithdraws;
	uint public lastUpdate;
	uint public vestRate;

	uint public ethWithdrawn;
	uint public daiWithdrawn;

	address[] public investors;

	// Rinkeby test deployment
	CompoundInterface compound = CompoundInterface(0x61bbd7Bd5EE2A202d7e62519750170A52A8DFD45);
	address public DAI_ADDRESS = 0x4e17c87c52d0E9a0cAd3Fbc53b77d9514F003807;

	event ProjectFunded(uint indexed id, uint amount, address from, FundType fundType);
    event ProjectWithdraw(uint indexed id, uint ethAmount, uint daiAmount, string message);
}
