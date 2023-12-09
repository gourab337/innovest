// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0;

contract innovest {

    uint32 public avgBlockTime;                          
	uint8 private decimals;                             
	uint8 public tax;                               	// Can be changed by Government only
	uint8 public feesLimitMonths;                       // Months any consumer can pay fees in advance for.
	uint256 public feesLimitBlocks;                   
	uint256 constant private MAX_UINT256 = 2**256 - 1;  
	uint256 public totalSupply;                         // By default 100 for 100% ownership. Can be changed.
	uint256 public totalSupply2;                        
	uint256 public feesPer30Day;                        // rate charged by projectOwner for 30 Days of service.
	uint256 public accumulated;                         
	uint256 public blocksPer30Day;                      
	uint256 public feesBegin;                           // begin of fees(in blocknumber)     
	uint256 public occupiedUntill;                      // blocknumber till the project is generating revenue
	uint256 private _taxdeduct; 
    
    string public name;                                 // Name of the project. Can be determined in Constructor _projectID
	string public symbol;                               // The symbol of the project. Can be determined in Constructor _projectSymbol

	address public gov = msg.sender;    	            // Government will deploy contract.
	address public projectOwner;                   // projectOwner can change consumer.Can become projectOwner by claimOwnership if owning > 51% of token.
	address public consumer;                              // only consumer can pay the Smart Contract.

	address[] public stakeholders;                      // Array of stakeholders. Government can addStakeholder or removeStakeholder. Recipient of token needs to be isStakeholder = true to be able to receive token. projectOwner & Government are stakeholder by default.

	mapping (address => uint256) public revenues;       // Distributed revenue account ballance for each stakeholder including gov.
	mapping (address => uint256) public shares;         // Addresses mapped to token ballances.
	mapping (address => mapping (address => uint256)) private allowed;   // All addresses allow unlimited token withdrawals by the government.
	mapping (address => uint256) public feespaidUntill; //Blocknumber untill the fees is paid.
	mapping (address => uint256) public sharesOffered;  //Number of Shares a Stakeholder wants to offer to other stakeholders
    mapping (address => uint256) public shareSellPrice; // Price per Share a Stakeholder wants to have when offering to other Stakeholders




	// Define events


	event ShareTransfer(address indexed from, address indexed to, uint256 shares);
	event Seizure(address indexed seizedfrom, address indexed to, uint256 shares);
	event ChangedTax(uint256 NewTax);
	event ProjectOwner(address NewProjectOwner);
	event NewStakeHolder(address StakeholderAdded);
	event CurrentlyEligibletoPayFees(address Consumer);
	event PrePayFeesLimit (uint8 Months);
	event AvgBlockTimeChangedTo(uint32 s);
	event FeesPer30DaySetTo (uint256 WEIs);
	event StakeHolderBanned (address banned);
	event RevenuesDistributed (address shareholder, uint256 gained, uint256 total);
	event Withdrawal (address shareholder, uint256 withdrawn);
	event Payout (uint256 date, address consumer, uint256 feesPaid, uint256 tax, uint256 distributableRevenue, uint256 consumedFrom, uint256 consumedUntill);
	event SharesOffered(address Seller, uint256 AmmountShares, uint256 PricePerShare);
	event SharesSold(address Seller, address Buyer, uint256 SharesSold,uint256 PricePerShare);


	constructor (string memory _projectID, string memory _projectSymbol, address _mainProjectOwner, uint8 _tax, uint32 _avgBlockTime) {
		shares[_mainProjectOwner] = 100;                   //one main Shareholder to be declared by government to get all initial shares.
		totalSupply = 100;                                  //supply fixed to 100 for now, Can also work with 10, 1000, 10 000...
		totalSupply2 = totalSupply**2;                      //above to the power of 2
		name = _projectID;
		decimals = 0;
		symbol = _projectSymbol;
		tax = _tax;                                         // set tax for deduction upon fees payment
		projectOwner = _mainProjectOwner;
		stakeholders.push(gov);                             //gov & projectOwner pushed to stakeholdersarray upon construction to allow payout and transfers
		stakeholders.push(projectOwner);
		allowed[projectOwner][gov] = MAX_UINT256;      //government can take all token from projectOwner with seizureFrom
		avgBlockTime = _avgBlockTime;                       // 13s recomended. Our representation of Time. Can be changed by gov with function SetAvgBlockTime
	    blocksPer30Day = 60*60*24*30/avgBlockTime;
	    feesLimitMonths = 12;                                   //fees limit in months can be changed by projectOwner
	    feesLimitBlocks = feesLimitMonths * blocksPer30Day;
	}

	// Define modifiers in this section

	modifier onlyGov{
	  require(msg.sender == gov);
	  _;
	}
	modifier onlyProjOwner{
	    require(msg.sender == projectOwner);
	    _;
	}
	modifier isMultipleOf{
	   require(msg.value % totalSupply2 == 0);              //modulo operation, only allow ether ammounts that are multiles of totalsupply^2. This is because there is no float and we will divide incoming ammounts two times to split it up and we do not want a remainder.
	    _;
	}
	modifier eligibleToPayFees{                             //only one consumer at a time can be allowed to pay fees.
	    require(msg.sender == consumer);
	    _;
	}


	// Define functions in this section

//viewable functions

	function showSharesOf(address _owner) public view returns (uint256 balance) {       //shows shares for each address.
		return shares[_owner];
	}

	 function isStakeholder(address _address) public view returns(bool, uint256) {      //shows whether someone is a stakeholder.
	    for (uint256 s = 0; s < stakeholders.length; s += 1){
	        if (_address == stakeholders[s]) return (true, s);
	    }
	    return (false, 0);
	 }

    function currentConsumerCheck (address _consumercheck) public view returns(bool,uint256){               //only works if from block.number on there is just one consumer, otherwise tells untill when rent is paid.
        require(occupiedUntill == feespaidUntill[consumer], "The entered address is not the current consumer");
        if (feespaidUntill[_consumercheck] > block.number){
        uint256 daysRemaining = (feespaidUntill[_consumercheck] - block.number)*avgBlockTime/86400;       //86400 seconds in a day.
        return (true, daysRemaining);                                                                   //gives consumer paid status true or false and days remaining
        }
        else return (false, 0);
    }



//functions of government

    function addStakeholder(address _stakeholder) public onlyGov {      //can add more stakeholders.
		(bool _isStakeholder, ) = isStakeholder(_stakeholder);
		if (!_isStakeholder) stakeholders.push(_stakeholder);
		allowed[_stakeholder][gov] = MAX_UINT256;                       //unlimited allowance to withdraw Shares for Government --> Government can seize shares.
		emit NewStakeHolder (_stakeholder);
    }

	function banStakeholder(address _stakeholder) public onlyGov {          // can remove stakeholder from stakeholders array and...
	    (bool _isStakeholder, uint256 s) = isStakeholder(_stakeholder);
	    if (_isStakeholder){
	        stakeholders[s] = stakeholders[stakeholders.length - 1];
	        stakeholders.pop();
	        seizureFrom (_stakeholder, msg.sender,shares[_stakeholder]);    //...seizes shares
	        emit StakeHolderBanned(_stakeholder);
	    }
	}

	function setTax (uint8 _x) public onlyGov {                             //set new tax rate (for incoming fees being taxed with %)
	   require( _x <= 100, "Valid tax rate  (0% - 100%) required" );
	   tax = _x;
	   emit ChangedTax (tax);
	}

	function SetAvgBlockTime (uint8 _sPerBlock) public onlyGov{         //we do not have a forgery proof time measurement in Ethereum. Therefore we count the ammount of blocks. One Block equals to 13s but this can be changed by the government.
	    require(_sPerBlock > 0, "Please enter a Value above 0");
	    avgBlockTime = _sPerBlock;
	    blocksPer30Day = (60*60*24*30) / avgBlockTime;
	    emit AvgBlockTimeChangedTo (avgBlockTime);
	}

   function distribute() public onlyGov {       // accumulated funds are distributed into revenues array for each stakeholder according to how many shares are held by shareholders. Additionally, government gets tax revenues upon each fees payment.
        uint256 _accumulated = accumulated;
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            address stakeholder = stakeholders[s];
            uint256 _shares = showSharesOf(stakeholder);
            uint256 ethertoreceive = (_accumulated/(totalSupply))*_shares;
            accumulated = accumulated - ethertoreceive;
            revenues[stakeholder] = revenues[stakeholder] + ethertoreceive;
            emit RevenuesDistributed(stakeholder,ethertoreceive, revenues[stakeholder]);
        }
   }

//hybrid Governmental

	function seizureFrom(address _from, address _to, uint256 _value) public returns (bool success) {           //government has unlimited allowance, therefore  can seize all assets from every stakeholder. Function also used to buyShares from Stakeholder.
		uint256 allowance = allowed[_from][msg.sender];
		require(shares[_from] >= _value && allowance >= _value);
		shares[_to] += _value;
		shares[_from] -= _value;
		if (allowance < MAX_UINT256) {
			allowed[_from][msg.sender] -= _value;
		}
		emit Seizure(_from, _to, _value);
		return true;
	}

//projectOwner functions

	function canPayFees(address _consumer) public onlyProjOwner{                  //decide who can pay fees in the future
	     consumer = _consumer;
	     emit CurrentlyEligibletoPayFees (consumer);
	}
	function limitadvancedfees(uint8 _monthstolimit) onlyProjOwner public{      //projectOwner can decide how many months in advance the project can be paid fees for out max
	    feesLimitBlocks = _monthstolimit *blocksPer30Day;
	    emit PrePayFeesLimit (_monthstolimit);
	}

    function setFeesper30Day(uint256 _fees) public onlyProjOwner{               //projectOwner can set feesPer30Day in WEI
	    feesPer30Day = _fees;
	    emit FeesPer30DaySetTo (feesPer30Day);
    }

//Stakeholder functions

    function offerShares(uint256 _sharesOffered, uint256 _shareSellPrice) public{       //Stakeholder can offer # of Shares for  Price per Share
        (bool _isStakeholder, ) = isStakeholder(msg.sender);
        require(_isStakeholder);
        require(_sharesOffered <= shares[msg.sender]);
        sharesOffered[msg.sender] = _sharesOffered;
        shareSellPrice[msg.sender] = _shareSellPrice;
        emit SharesOffered(msg.sender, _sharesOffered, _shareSellPrice);
    }

    function buyShares (uint256 _sharesToBuy, address payable _from) public payable{    //Stakeholder can buy shares from seller for sellers price * ammount of shares
        (bool _isStakeholder, ) = isStakeholder(msg.sender);
        require(_isStakeholder);
        require(msg.value == _sharesToBuy * shareSellPrice[_from] && _sharesToBuy <= sharesOffered[_from] && _sharesToBuy <= shares[_from] &&_from != msg.sender); //
        allowed[_from][msg.sender] = _sharesToBuy;
        seizureFrom(_from, msg.sender, _sharesToBuy);
        sharesOffered[_from] -= _sharesToBuy;
        _from.transfer(msg.value);
        emit SharesSold(_from, msg.sender, _sharesToBuy,shareSellPrice[_from]);
    }

	function transfer(address _recipient, uint256 _amount) public returns (bool) {      //transfer of Token, requires isStakeholder
        (bool isStakeholderX, ) = isStakeholder(_recipient);
	    require(isStakeholderX);
	    require(shares[msg.sender] >= _amount);
	    shares[msg.sender] -= _amount;
	    shares[_recipient] += _amount;
	    emit ShareTransfer(msg.sender, _recipient, _amount);
	    return true;
	 }



	function claimOwnership () public {             //claim main project ownership
		require(shares[msg.sender] > (totalSupply /2) && msg.sender != projectOwner,"Error. You do not own more than 50% of the project tokens or you are the main owner already");
		projectOwner = msg.sender;
		emit ProjectOwner(projectOwner);
	}



   function withdraw() payable public {          //revenues can be withdrawn from individual shareholders (government can too withdraw its own revenues)
        require(revenues[msg.sender] > 0, "No available revenue to withdraw");
        uint256 revenue = revenues[msg.sender];
        revenues[msg.sender] = 0;
        payable(msg.sender).transfer(revenue);
        emit Withdrawal(msg.sender, revenue);
   }

//fees payment function

    function payFees(uint8 _months) public payable isMultipleOf eligibleToPayFees{          //needs to be eligible to pay fees
        uint256  _feesdue  = _months * feesPer30Day;
        uint256  _additionalBlocks  = _months * blocksPer30Day;
        require (msg.value == _feesdue && block.number + _additionalBlocks < block.number + feesLimitBlocks);     //sent in Ether has to be _feesdue; additional blocks for fees cannot be higher than limit.
        _taxdeduct = (msg.value/totalSupply * tax);                                 //deduct taxes
        accumulated += (msg.value - _taxdeduct);                                    //accumulate revenues
        revenues[gov] += _taxdeduct;                                                //accumulate taxes
        if (feespaidUntill[consumer] == 0 && occupiedUntill < block.number) {         //hasn't consumed yet & flat is empty
            feespaidUntill[consumer] = block.number + _additionalBlocks;              //fees from now on
            feesBegin = block.number;
        }
        else if (feespaidUntill[consumer] == 0 && occupiedUntill > block.number) {    //hasn't consumed yet & flat is occupied
            feespaidUntill[consumer] = occupiedUntill + _additionalBlocks;            //fees from when it is free
            feesBegin = occupiedUntill;
        }
        else if ( feespaidUntill[consumer] > block.number) {                          //is consuming, contract is runing
            feespaidUntill[consumer] += _additionalBlocks;                            //fees from when it is free
            feesBegin = occupiedUntill;
        }
        else if (feespaidUntill[consumer] < block.number && occupiedUntill>block.number) {    //has fees before & flat is occupied
            feespaidUntill[consumer] = occupiedUntill +_additionalBlocks;                     //fees from when it is free
            feesBegin = occupiedUntill;
        }
        else if (feespaidUntill[consumer] < block.number && occupiedUntill<block.number) {    //has consumed before & flat is empty
            feespaidUntill[consumer] = block.number + _additionalBlocks;                      //fees from now on
            feesBegin = block.number;                                                     //has lived before and flat is empgy
        }
        occupiedUntill  = feespaidUntill[consumer];                                           //set new occupiedUntill
        emit Payout (block.timestamp, msg.sender, msg.value, _taxdeduct, (msg.value - _taxdeduct), feesBegin, occupiedUntill);
    }


    receive () external payable {
        payable(msg.sender).transfer(msg.value);
        }
}


