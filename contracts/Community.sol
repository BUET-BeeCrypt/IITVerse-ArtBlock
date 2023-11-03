//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import { ABXToken } from "./ABXToken.sol";
import { CTK } from "./CTK.sol";

contract ArtBlock {
    struct Community {
        CTK ctk;
        address owner;
        string title;
        string description;
    }

    // user spends 2 ABX to create a community
    uint256 public constant Y = 2; 

    address public owner;
    ABXToken public abxToken; // Reference to the ABX token contract
    Community[] public communities;

    constructor(address _abxToken) {
        owner = msg.sender;
        abxToken = ABXToken(_abxToken);
    }

    function createCommunity(string memory title, string memory description) external {
        console.log(
            "abxTokenAddress: %s, balance: %s, transfer val: %d",
            address(msg.sender),
            abxToken.balanceOf(msg.sender),
            Y
        );

        abxToken.transferToken(msg.sender, address(this), Y);

        CTK ctk = new CTK(address(abxToken), 1);
        ctk.createToken(Y);

        Community memory community = Community({
            ctk: ctk,
            owner: msg.sender,
            title: title,
            description: description
        });

        communities.push(community);
    }

    // get community count
    function getCommunityCount() external view returns (uint256) {
        return communities.length;
    }

    // get community
    function getCommunity(uint256 communityId) external view returns (Community memory) {
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        return communities[communityId];
    }

    // get community token by community id and user address
    function getCommunityToken(uint256 communityId, address user) external view returns (uint256) {
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        return communities[communityId].ctk.balanceOf(user);
    }

    // buy community token
    function buyCommunityToken(uint256 communityId, uint256 numberOfTokens) external payable {
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        communities[communityId].ctk.buyToken(numberOfTokens, msg.sender);
    }

}
