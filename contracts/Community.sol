//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import { ABXToken } from "./ABXToken.sol";
import { CTK } from "./CTK.sol";
import {ArtProductSystem} from "./ArtProductSystem.sol";

contract ArtBlock {
    struct Community {
        CTK ctk;
        ArtProductSystem artProductSystem;
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

        // create community tokens
        CTK ctk = new CTK(address(abxToken), 1);
        ctk.createToken(Y);

        // create community art product system
        ArtProductSystem artProductSystem = new ArtProductSystem(address(ctk));


        Community memory community = Community({
            ctk: ctk,
            artProductSystem: artProductSystem,
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

    // get all community list
    function getCommunityList() external view returns (Community[] memory) {
        return communities;
    }

    // create ar product 
    function createArtProduct(
        uint256 communityId,
        string memory title, 
        string memory description, 
        uint256 price,
        bool isExclusive,
        string memory _ipfsHash,
        uint256 durationSec
    ) external {
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        communities[communityId].artProductSystem.createProduct(
            msg.sender, title, description, price, isExclusive, _ipfsHash, durationSec);
    }

    // vote product
    function voteProduct(uint256 communityId, uint256 productId, bool isUpVote) external {
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        communities[communityId].artProductSystem.voteProduct(msg.sender, productId, isUpVote);
    }

    // get productList
    function getProductList(uint256 communityId) external view returns (ArtProductSystem.ArtProduct[] memory){
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        return communities[communityId].artProductSystem.getProductList();
    }

    // get product list by owner
    function getProductListByOwner(uint256 communityId) external view returns (ArtProductSystem.ArtProduct[] memory){
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        return communities[communityId].artProductSystem.getProductListByOwner(msg.sender);
    }


    // get product
    function getProduct(uint256 communityId, uint256 productId) 
    external view returns(ArtProductSystem.ArtProduct memory){
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        return communities[communityId].artProductSystem.getProduct(productId);
    }

     // get product
    function verifyProduct(uint256 communityId, uint256 productId) 
    external {
        if( communityId >= communities.length ) {
            revert("invalid community id");
        }
        communities[communityId].artProductSystem.verifyProduct(productId);
    }
}
