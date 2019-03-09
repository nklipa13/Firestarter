pragma solidity ^0.5.0;

contract Vesting {	

	struct VestingRecord {
		uint rate;
		uint block;
		uint next;
	}

	mapping(uint => VestingRecord) public allVestings;
	uint public totalVestings;
	uint public maxId = 1;
	uint public firstVestingRecord;

	function addVestingRecord(uint _rate, uint _block) public returns(uint id) {
		id = maxId;

		allVestings[id] = VestingRecord({
			rate: _rate,
			block: _block,
			next: 0		
		});

		if (totalVestings > 0) {
			uint previous = findPrevious(_block);
			if (previous == 0) {
			    allVestings[id].next = firstVestingRecord;
				firstVestingRecord = id;
			} else {
            	allVestings[id].next = allVestings[previous].next;
    			allVestings[previous].next = id;
			}
		} else {
			firstVestingRecord = id;
		}

		totalVestings++;
		maxId++;
	}

	function removeVestingRecord(uint _id) public {
		if (_id == firstVestingRecord) {
			firstVestingRecord = allVestings[_id].next;
		} else {
			// its not possible to be 0
			uint previous = findPreviousWithId(_id);
			allVestings[previous].next = allVestings[_id].next;
		}

		totalVestings--;
	}
	

	function findPrevious(uint _block) public view returns(uint) {
		uint curr = firstVestingRecord;

		while (allVestings[curr].next != 0 && allVestings[allVestings[curr].next].block < _block) {
			curr = allVestings[curr].next;
		}

        // send 0 if it needs to be added on start
        if (curr == firstVestingRecord && allVestings[curr].block > _block) {
            return 0;
        }
        
		return curr;
	}

	function findPreviousWithId(uint _id) public view returns(uint) {
		uint curr = firstVestingRecord;

		while (allVestings[curr].next != _id) {
			curr = allVestings[curr].next;
		}
        
		return curr;
	}

	function getArr() public view returns(uint[] memory arr) {
		arr = new uint[](totalVestings);

		uint curr = firstVestingRecord;
		uint count = 0;
		while (allVestings[curr].next != 0) {
			arr[count] = allVestings[curr].block;
			count++;
			curr = allVestings[curr].next;
		}		
		arr[count] = allVestings[curr].block;
	}
	

}
