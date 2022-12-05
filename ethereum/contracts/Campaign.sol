// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaign;

    function createCampaign(uint256 _minimum) public {
        address newCampagin = new Campaign(_minimum, msg.sender);

        deployedCampaign.push(newCampagin);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaign;
    }
}

//kickstarter
contract Campaign {
    struct Request {
        string description; //description for request
        uint256 value; //amount of request wanna send
        address recipient; // who will received the money
        bool complete; // to check whether the money has been sent out or not.
        mapping(address => bool) approvals;
        uint256 approvalCount;
    }

    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 _minimumContribution, address _creator) public {
        manager = _creator;
        minimumContribution = _minimumContribution;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory _description,
        uint256 _value,
        address _recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            recipient: _recipient,
            complete: false,
            approvalCount: 0

            // no need to write reference type, therefore mapping approvals is not initial
        });

        // Request(_description,_value,_recipient,false); //not recommend to use because might cause some issues

        requests.push(newRequest);
    }

    function approverRequest(uint256 _requestIndex) public {
        Request storage request = requests[_requestIndex];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]); // check the person vote dy or not

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 _requestIndex) public restricted {
        Request storage request = requests[_requestIndex];

        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
