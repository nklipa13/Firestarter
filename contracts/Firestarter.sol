pragma solidity ^0.5.0;

import "./Vesting.sol";

contract Firestarter is Vesting {

	enum FundType { DirectType, VestingType, CompoundType }

	struct Fund {
		uint amount;
		FundType fundType;
	}

	struct Project {
		address owner;
		string name;
		uint funds;
		mapping(address => Fund[]) allFunds;
		address[] investors;
		uint lastUpdate;
		uint vestRate;
	}

	Project[] public projects;

	event ProjectCreated(uint id, string name, address owner);
	event ProjectFunded(uint id, uint amount, address from, FundType fundType);

	function addProject(string memory _name) public {
		projects.push(Project({
				owner: msg.sender,
				name: _name,
				funds: 0,
				investors: new address[](0),
				lastUpdate: block.number,
				vestRate: 0
			}));

		emit ProjectCreated(projects.length-1, _name, msg.sender);
	}
	
	function fundProjectDirectly(uint _id) public payable {
		
		projects[_id].funds += msg.value;

		addInvestorIfNeeded(msg.sender, _id);

		projects[_id].allFunds[msg.sender].push(Fund({
				amount: msg.value,
				fundType: FundType.DirectType
			}));

		emit ProjectFunded(_id, msg.value, msg.sender, FundType.DirectType);
	}

	function fundProjectByVesting(uint _id, uint _numOfBlocks) public payable {
		addInvestorIfNeeded(msg.sender, _id);

		projects[_id].allFunds[msg.sender].push(Fund({
				amount: msg.value,
				fundType: FundType.VestingType
			}));

		addVestingRecord(msg.value / _numOfBlocks, block.number + _numOfBlocks);
		updateBalance(_id);
		
		projects[_id].vestRate += msg.value / _numOfBlocks;

		emit ProjectFunded(_id, msg.value, msg.sender, FundType.DirectType);
	}

	function updateBalance(uint _id) public {
		uint balance;
		uint rate;
		(balance, rate) = getNewBalanceAndRate(_id);

		projects[_id].funds = balance;
		projects[_id].vestRate = rate;
		projects[_id].lastUpdate = block.number;
	}

	function getNewBalanceAndRate(uint _id) public returns(uint, uint) {
		uint previous = findPrevious(block.number);

		uint curr = firstVestingRecord;
		uint rate = projects[_id].vestRate;
		uint balance = projects[_id].funds;
		uint lastUpdate = projects[_id].lastUpdate;

		if (previous != 0) {
			while (curr != previous) {
				balance += (allVestings[curr].block - lastUpdate) * rate;
				rate -= allVestings[curr].rate;
				lastUpdate = allVestings[curr].block;

				uint next = allVestings[curr].next;
				removeVestingRecord(curr);
				curr = next;
			}
			
			balance += (allVestings[curr].block - lastUpdate) * rate;
			rate -= allVestings[curr].rate;
			lastUpdate = allVestings[curr].block;

			removeVestingRecord(curr);
		} 

		balance += (block.number - lastUpdate) * rate;

		return (balance, rate);
	}

	function addInvestorIfNeeded(address _user, uint _projectId) internal {
		//needs to change this in future

		if (projects[_projectId].allFunds[_user].length == 0) {
			projects[_projectId].investors.push(_user);
		}
	}

	function totalProjects() public view returns(uint) {
		return projects.length;
	}

	function totalFunds(uint _projectId, address _from) public view returns(uint) {
		return projects[_projectId].allFunds[_from].length;
	}

	function getFund(uint _projectId, address _from, uint _fundId) public view returns(uint amount, FundType fundType) {
	    Fund memory fund = projects[_projectId].allFunds[_from][_fundId];
		return (fund.amount, fund.fundType);
	}
	


}
