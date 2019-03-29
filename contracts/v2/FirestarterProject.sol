pragma solidity ^0.5.0;

import "./IFirestarterProject.sol";
import "./SafeMath.sol";

contract FirestarterProject is IFirestarterProject {

    using SafeMath for uint256;

    modifier addInvestorIfNeeded(address _user) { 
        if (allFunds[_user].length == 0) {
            investors.push(_user);
        }
        _; 
    }
    
    constructor(address _owner, string memory _name, uint _id, uint _commisssion) public {
        owner = _owner;
        name = _name;
        id = _id;
        manager = msg.sender;
        HOUSE_COMMISSION = _commisssion;

        ERC20(DAI_ADDRESS).approve(address(compound), uint(-1));
    }

    function fundProjectDirectly() public payable addInvestorIfNeeded(msg.sender) {
        totalFunds = totalFunds.add(msg.value);

        allFunds[msg.sender].push(Fund({
            amount: msg.value,
            fundType: FundType.DirectType,
            canceled: 0,
            end: 0,
            start: block.number
        }));

        emit ProjectFunded(id, msg.value, msg.sender, FundType.DirectType);
    }

    function fundProjectByVesting(uint _numOfBlocks) public payable addInvestorIfNeeded(msg.sender) {
        uint amountPerBlock = msg.value.div(_numOfBlocks);

        allFunds[msg.sender].push(Fund({
            amount: amountPerBlock,
            fundType: FundType.VestingType,
            canceled: 0,
            end: block.number + _numOfBlocks,
            start: block.number
        }));

        addVestingRecord(amountPerBlock, block.number + _numOfBlocks);
        updateBalance();

        vestRate = vestRate.add(amountPerBlock);

        emit ProjectFunded(id, msg.value, msg.sender, FundType.VestingType);
    }

    function fundProjectByCompound(uint _daiAmount) public addInvestorIfNeeded(msg.sender) {
        require(ERC20(DAI_ADDRESS).transferFrom(msg.sender, address(this), _daiAmount));

        uint errCode = compound.supply(DAI_ADDRESS, _daiAmount);

        assert(errCode == 0);

        currentDaiFunds = currentDaiFunds.add(_daiAmount);

        allFunds[msg.sender].push(Fund({
            amount: _daiAmount,
            fundType: FundType.CompoundType,
            canceled: 0,
            end: 0,
            start: block.number
        }));

        emit ProjectFunded(id, _daiAmount, msg.sender, FundType.CompoundType);
    }
    
    function stopFunding(uint _fundId) public {
        Fund memory fund = allFunds[msg.sender][_fundId];

        require(fund.fundType != FundType.DirectType);
        require(fund.canceled == 0);

        if (fund.fundType == FundType.VestingType) {
            updateBalance();
        
            msg.sender.transfer(fund.amount.mul(fund.end.sub(block.number)));
        
            vestRate = vestRate.sub(fund.amount);
            removeVestingRecordWithRateAndBlock(fund.amount, fund.end);
        } else {
            compound.withdraw(DAI_ADDRESS, fund.amount);
            ERC20(DAI_ADDRESS).transfer(msg.sender, fund.amount);
            currentDaiFunds = currentDaiFunds.sub(fund.amount);
        }

        allFunds[msg.sender][_fundId].canceled = block.number;
    }

    function withdraw(uint _ethBalance, uint _daiBalance, string memory _message) public {
        uint compoundBalance = compound.getSupplyBalance(address(this), DAI_ADDRESS);

        // update before we try to get it
        updateBalance();

        // only owner can withdraw (owner can be some DAO in future)
        require(owner == msg.sender);
        // _ethBalance to be withdrawn must be less or equal to all funds ever sent to this contract - ether that is withdrawn in past
        require(_ethBalance <= (totalFunds - ethWithdrawn));
        // _daiBalance must be equal or less to fullCompoundBalance - all current dai funds
        require(_daiBalance <= (compoundBalance - currentDaiFunds));

        if (_ethBalance > 0) {
            msg.sender.transfer(_ethBalance.mul(100-HOUSE_COMMISSION).div(100));
            manager.transfer(_ethBalance.mul(HOUSE_COMMISSION).div(100));
            ethWithdrawn = ethWithdrawn.add(_ethBalance);
        }

        if (_daiBalance > 0) {
            compound.withdraw(DAI_ADDRESS, _daiBalance);
            require(ERC20(DAI_ADDRESS).transfer(msg.sender, _daiBalance.mul(100-HOUSE_COMMISSION).div(100)));
            require(ERC20(DAI_ADDRESS).transfer(manager, _daiBalance.mul(HOUSE_COMMISSION).div(100)));
            daiWithdrawn = daiWithdrawn.add(_daiBalance);
        }

        allWithdraws[totalWithdraws] = Withdraw({
                ethAmount: _ethBalance,
                daiAmount: _daiBalance,
                message: _message
            });
        
        totalWithdraws++;

        emit ProjectWithdraw(id, _ethBalance, _daiBalance, _message);
    }

    function updateBalance() public {
        uint balance;
        uint rate;
        (balance, rate) = getNewBalanceAndRateAndUpdateVestingRecords();

        totalFunds = balance;
        vestRate = rate;
        lastUpdate = block.number;
    }

    function getNewBalanceAndRateAndUpdateVestingRecords() internal returns(uint, uint) {
        uint previous = findPrevious(block.number);

        uint curr = firstVestingRecord;
        uint rate = vestRate;
        uint balance = totalFunds;
        uint lastUpdate = lastUpdate;

        if (previous != 0) {
            while (curr != previous) {
                balance = balance.add(allVestings[curr].block.sub(lastUpdate).mul(rate));
                rate = rate.sub(allVestings[curr].rate);
                lastUpdate = allVestings[curr].block;

                uint next = allVestings[curr].next;
                removeVestingRecord(curr);
                curr = next;
            }
            
            balance = balance.add(allVestings[curr].block.sub(lastUpdate).mul(rate));
            rate = rate.sub(allVestings[curr].rate);
            lastUpdate = allVestings[curr].block;

            removeVestingRecord(curr);
        }

        balance = balance.add(block.number.sub(lastUpdate)).mul(rate);

        return (balance, rate);
    }
}
