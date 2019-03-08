pragma solidity ^0.5.0;

contract Firestarter {

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
	}

	Project[] public projects;

	event ProjectCreated(uint id, string name, address owner);
	event ProjectFunded(uint id, uint amount, address from, FundType fundType);

	function addProject(string memory _name) public {
		projects.push(Project({
				owner: msg.sender,
				name: _name,
				funds: 0,
				investors: new address[](0)
			}));

		emit ProjectCreated(projects.length-1, _name, msg.sender);
	}
	
	function fundProjectDirectly(uint _id) public payable {
		
		projects[_id].funds += msg.value;

		if (projects[_id].allFunds[msg.sender].length == 0) {
			projects[_id].investors.push(msg.sender);
		}

		projects[_id].allFunds[msg.sender].push(Fund({
				amount: msg.value,
				fundType: FundType.DirectType
			}));

		emit ProjectFunded(_id, msg.value, msg.sender, FundType.DirectType);
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
