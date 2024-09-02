// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Crowdfunding} from "./Crowdfunding.sol";

contract CrowdFundingFactory {
    address public owner;
    bool public paused;

    struct Campaign {
        address campaignAddress;
        address owner;
        string name;
        uint256 creationTime;
    }

    Campaign[] public campaigns;
    mapping(address => Campaign[]) public userCampaigns;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner.");
        _;
    }

    modifier notPaused() {
        require(!paused, "factory is paused");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays
    ) external notPaused {
        Crowdfunding newCampaign = new Crowdfunding(
            msg.sender,
            _name,
            _description,
            _goal,
            _durationInDays
        );
        address campaignAddress = address(newCampaign);

        Campaign memory campaign = Campaign({
            campaignAddress: campaignAddress,
            name: _name,
            owner: msg.sender,
            creationTime: block.timestamp
        });

        campaigns.push(campaign);
        userCampaigns[msg.sender].push(campaign);
    }

    function getUserCampaigns(address _user)
        external
        view
        returns (Campaign[] memory)
    {
        return userCampaigns[_user];
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function togglePause() external onlyOwner{
        paused = !paused;
    }
}
