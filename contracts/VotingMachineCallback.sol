pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import '@daostack/infra/contracts/votingMachines/AbsoluteVote.sol';
import "./IFirestarter.sol";

contract VotingMachineCallback is VotingMachineCallbacksInterface, ProposalExecuteInterface {

    function mintReputation(uint256 _amount, address _beneficiary, bytes32 _proposalId) external returns(bool) {}
    function burnReputation(uint256 _amount, address _owner, bytes32 _proposalId) external returns(bool) {}
    function stakingTokenTransfer(IERC20 _stakingToken, address _beneficiary, uint256 _amount, bytes32 _proposalId)
    external
    returns(bool) {}
    function balanceOfStakingToken(IERC20 _stakingToken, bytes32 _proposalId) external view returns(uint256){}

//--------------------------------------------------------------------------------------------------------

	address public firestarter;
	AbsoluteVote public absoluteVote;
	bytes32 public paramsHash;
	uint public projectId;

    address public DAI_ADDRESS = 0x4e17c87c52d0E9a0cAd3Fbc53b77d9514F003807;

    mapping(bytes32 => uint) public ethWanted;
    mapping(bytes32 => uint) public daiWanted;
    mapping(bytes32 => address payable) public proposer;

	event ProposalCreated(bytes32 indexed proposalId, address indexed proposer);
	event ProposalFinished(bytes32 indexed proposalId, int decision);
	event ProposalVote(bytes32 indexed proposalId, uint vote, address indexed voter);

	constructor(uint _projectId) public {
		projectId = _projectId;
		firestarter = msg.sender;
		absoluteVote = new AbsoluteVote();
		paramsHash = absoluteVote.setParameters(51, address(this)); 
	}

	function vote(bytes32 _proposalId, bool yes) public {

        absoluteVote.vote(_proposalId, yes ? 1 : 0, 0, msg.sender);

        emit ProposalVote(_proposalId, yes ? 1 : 0, msg.sender);
	}

	function createProposal(uint _ethAmount, uint _daiAmount) public {
		bytes32 proposalId = absoluteVote.propose(2, paramsHash, address(0), address(this));

        ethWanted[proposalId] = _ethAmount;
        daiWanted[proposalId] = _daiAmount;
        proposer[proposalId] = msg.sender;

		emit ProposalCreated(proposalId, msg.sender);
	}

    function getTotalReputationSupply(bytes32 _proposalId) external view returns(uint256) {
    	uint balance;
    	uint rate;

    	(balance, rate) = IFirestarter(firestarter).getNewBalanceAndRateView(projectId);

    	return balance;
    }

    function reputationOf(address _owner, bytes32 _proposalId) external view returns(uint256) {
    	return IFirestarter(firestarter).userFundedProject(projectId, _owner);
    }

    function executeProposal(bytes32 _proposalId, int _decision) external returns(bool) {

        if (_decision == 1) {
            IFirestarter(firestarter).withdraw(projectId, ethWanted[_proposalId], daiWanted[_proposalId], "Got from proposal");

            proposer[_proposalId].transfer(address(this).balance);
            uint balance = IERC20(DAI_ADDRESS).balanceOf(address(this));
            IERC20(DAI_ADDRESS).transfer(msg.sender, balance);
        }

    	emit ProposalFinished(_proposalId, _decision);
    }

    function bytes32ToStr(bytes32 _bytes32) public pure returns (string memory) {
        bytes memory bytesArray = new bytes(64);
        
        for (uint256 i; i < 32; i=i+2) {
            bytesArray[i] = _bytes32[i];
        }

        return string(bytesArray);
    }

}