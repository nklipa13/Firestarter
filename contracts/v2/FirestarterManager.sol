pragma solidity ^0.5.0;

import "./FirestarterProject.sol";
import "./ERC20.sol";

contract FirestarterManager {

	address public DAI_ADDRESS = 0x4e17c87c52d0E9a0cAd3Fbc53b77d9514F003807;

	struct Project {
		address creator;			
		address projectContract;
	}

	Project[] public projects;

	uint public HOUSE_COMMISSION = 2;
	address public owner;

	event ProjectCreated(uint indexed id, address indexed creator, address projectContract, string name);

	constructor() public {
		owner = msg.sender;
	}

	function createProject(string memory _name) public {
        uint id = projects.length;

        Project memory project;
        project.creator = msg.sender;
        project.projectContract = address(new FirestarterProject(msg.sender, _name, id, HOUSE_COMMISSION));

        projects.push(project);

        emit ProjectCreated(id, msg.sender, project.projectContract, _name);
    }

    function changeCommission(uint _newCommission) public {
    	require(msg.sender == owner);

    	HOUSE_COMMISSION = _newCommission;
    }

    function getBalances() public view returns(uint ethBalance, uint daiBalance) {
    	daiBalance = ERC20(DAI_ADDRESS).balanceOf(address(this));
    	ethBalance = address(this).balance;
    }

    function withdraw(uint _ethBalance, uint _daiBalance) public {
    	require(msg.sender == owner);

    	if (_ethBalance > 0) {
    		msg.sender.transfer(_ethBalance);
    	}

    	if (_daiBalance > 0) {
    		require(ERC20(DAI_ADDRESS).transfer(msg.sender, _daiBalance));
    	}
    }
}