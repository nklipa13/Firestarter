pragma solidity ^0.5.0;

import "./Vesting.sol";
import "./CompoundInterface.sol";
import "./ERC20.sol";
import "./VotingMachineCallback.sol";

contract Firestarter is Vesting {

	enum FundType { DirectType, VestingType, CompoundType }

	struct Withdraw {
		uint ethAmount;
		uint daiAmount;
		string message;
	}

	struct Fund {
		uint amount;
		FundType fundType;
		uint canceled;
		uint end;
	}

	struct Project {
		address owner;
		string name;
		uint funds;
		uint daiFunds;
		mapping(address => Fund[]) allFunds;
		// solidity doesn't support array of structs in struct, so implementing it on my own
		mapping(uint => Withdraw) allWithdraws;
		uint totalWithdraws;
		address[] investors;
		uint lastUpdate;
		uint vestRate;
		uint ethWithdrawn;
		uint daiWithdrawn;
		address votingMachineCallback;
	}

	Project[] public projects;

	// Rinkeby test deployment
	CompoundInterface compound = CompoundInterface(0x61bbd7Bd5EE2A202d7e62519750170A52A8DFD45);
	address public DAI_ADDRESS = 0x4e17c87c52d0E9a0cAd3Fbc53b77d9514F003807;

	event ProjectCreated(uint indexed id, string name, address indexed owner);
	event ProjectFunded(uint indexed id, uint amount, address from, FundType fundType);
	event ProjectWithdraw(uint indexed id, uint ethAmount, uint daiAmount, string message);

	constructor() public {
		ERC20(DAI_ADDRESS).approve(address(compound), uint(-1));
	}

	function addProject(string memory _name) public {
		
		Project memory project;
		project.owner = msg.sender;
		project.name = _name;
		project.votingMachineCallback = address(new VotingMachineCallback(totalProjects()));

		projects.push(project);

		emit ProjectCreated(projects.length-1, _name, msg.sender);
	}
	
	function fundProjectDirectly(uint _id) public payable {
		
		projects[_id].funds += msg.value;

		addInvestorIfNeeded(msg.sender, _id);

		projects[_id].allFunds[msg.sender].push(Fund({
				amount: msg.value,
				fundType: FundType.DirectType,
				canceled: 0,
				end: 0
			}));

		emit ProjectFunded(_id, msg.value, msg.sender, FundType.DirectType);
	}

	function fundProjectByVesting(uint _id, uint _numOfBlocks) public payable {
		addInvestorIfNeeded(msg.sender, _id);

		projects[_id].allFunds[msg.sender].push(Fund({
				amount: msg.value / _numOfBlocks,
				fundType: FundType.VestingType,
				canceled: 0,
				end: block.number + _numOfBlocks
			}));

		addVestingRecord(msg.value / _numOfBlocks, block.number + _numOfBlocks);
		updateBalance(_id);
		
		projects[_id].vestRate += msg.value / _numOfBlocks;

		emit ProjectFunded(_id, msg.value, msg.sender, FundType.DirectType);
	}

	///@dev Before calling must approve contract to transferFrom Dai
	function fundProjectByCompound(uint _id, uint _daiAmount) public {
		addInvestorIfNeeded(msg.sender, _id);

		ERC20(DAI_ADDRESS).transferFrom(msg.sender, address(this), _daiAmount);

		uint errCode = compound.supply(DAI_ADDRESS, _daiAmount);

		assert(errCode == 0);

		projects[_id].daiFunds += _daiAmount;

		projects[_id].allFunds[msg.sender].push(Fund({
			amount: _daiAmount,
			fundType: FundType.CompoundType,
			canceled: 0,
			end: 0
		}));
        
        emit ProjectFunded(_id, _daiAmount, msg.sender, FundType.CompoundType);
	}

	function stopFunding(uint _projectId, uint _fundId) public {
		Fund memory fund = projects[_projectId].allFunds[msg.sender][_fundId];
		// can't stop one time payment
		require(fund.fundType != FundType.DirectType);
		require(fund.canceled == 0);

		if (fund.fundType == FundType.VestingType) {
			updateBalance(_projectId);

			projects[_projectId].vestRate -= fund.amount;
			projects[_projectId].allFunds[msg.sender][_fundId].canceled = block.number;
			removeVestingRecordWithRateAndBlock(fund.amount, fund.end);
		} else {
			compound.withdraw(DAI_ADDRESS, fund.amount);
			ERC20(DAI_ADDRESS).transfer(msg.sender, fund.amount);
			projects[_projectId].daiWithdrawn -= fund.amount;

			projects[_projectId].allFunds[msg.sender][_fundId].canceled = block.number;
		}
	}

	function withdraw(uint _projectId, uint _ethBalance, uint _daiBalance, string memory _message) public {
		uint currentFullBalance = compound.getSupplyBalance(address(this), DAI_ADDRESS);

		// update before we try to get it
		updateBalance(_projectId);
		Project memory project = projects[_projectId];

		require(project.owner == msg.sender || project.votingMachineCallback == msg.sender);
		require(_ethBalance <= (project.funds - project.ethWithdrawn));
		require(_daiBalance <= (currentFullBalance - project.daiFunds));

		if (_ethBalance > 0) {
			msg.sender.transfer(_ethBalance);
			projects[_projectId].ethWithdrawn += _ethBalance;
		}

		if (_daiBalance > 0) {
			compound.withdraw(DAI_ADDRESS, _daiBalance);
			ERC20(DAI_ADDRESS).transfer(msg.sender, _daiBalance);
			projects[_projectId].daiWithdrawn += _daiBalance;
		}

		projects[_projectId].allWithdraws[projects[_projectId].totalWithdraws] = Withdraw({
				ethAmount: _ethBalance,
				daiAmount: _daiBalance,
				message: _message
			});
		projects[_projectId].totalWithdraws++;

		emit ProjectWithdraw(_projectId, _ethBalance, _daiBalance, _message);
	}

	function getMaxWithdraws(uint _projectId) public view returns(uint maxEth, uint maxDai) {
		uint currentFullBalance = compound.getSupplyBalance(address(this), DAI_ADDRESS);

		// update before we try to get it
		uint balance;
		uint rate;
		(balance, rate) = getNewBalanceAndRateView(_projectId);
		Project memory project = projects[_projectId];

		maxEth = (balance - project.ethWithdrawn);
		maxDai = (currentFullBalance - project.daiFunds);
	}

	function getFullEarnings(uint _projectId) public view returns(uint fullEth, uint fullDai) {
		uint currentFullBalance = compound.getSupplyBalance(address(this), DAI_ADDRESS);

		// update before we try to get it
		uint rate;
		(fullEth, rate) = getNewBalanceAndRateView(_projectId);
		Project memory project = projects[_projectId];
		fullDai = (currentFullBalance - project.daiFunds) + project.daiWithdrawn;
	}
	

	function updateBalance(uint _id) public {
		uint balance;
		uint rate;
		(balance, rate) = getNewBalanceAndRate(_id);

		projects[_id].funds = balance;
		projects[_id].vestRate = rate;
		projects[_id].lastUpdate = block.number;
	}

	function getNewBalanceAndRate(uint _id) internal returns(uint, uint) {
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

	function getNewBalanceAndRateView(uint _id) public view returns(uint, uint) {
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
				// removeVestingRecord(curr);
				curr = next;
			}
			
			balance += (allVestings[curr].block - lastUpdate) * rate;
			rate -= allVestings[curr].rate;
			lastUpdate = allVestings[curr].block;

			// removeVestingRecord(curr);
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

	function userFundedProject(uint _projectId, address _user) public view returns(uint) {
		Fund[] memory userFunds = projects[_projectId].allFunds[_user];

		uint count = userFunds.length;
		uint balance = 0;
		for (uint i=0; i<count; i++) {
			balance += userFunds[i].amount;
		}

		return balance;
	}

	function totalProjects() public view returns(uint) {
		return projects.length;
	}

	function totalFunds(uint _projectId, address _from) public view returns(uint) {
		return projects[_projectId].allFunds[_from].length;
	}

	function getFund(uint _projectId, address _from, uint _fundId) public view returns(uint amount, FundType fundType, uint canceled, uint end) {
	    Fund memory fund = projects[_projectId].allFunds[_from][_fundId];
	    
	    amount = fund.amount;
	    fundType = fund.fundType;
	    canceled = fund.canceled;
	    end = fund.end;
	}
	
	// remix for skipping few blocks
	function skip() public {}
}
