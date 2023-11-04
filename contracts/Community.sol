//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;
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

    modifier validCommunityId(uint256 communityId) {
        require(communityId < communities.length, "invalid community id");
        _;
    }

    function createCommunity(string memory title, string memory description) external {
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
    function getCommunity(uint256 cid) external view validCommunityId(cid) returns (Community memory) {
        return communities[cid];
    }

    // get community token by community id and user address
    function getCommunityToken(uint256 cid, address user) external  view validCommunityId(cid) returns (uint256) {
        return communities[cid].ctk.balanceOf(user);
    }

    // buy community token
    function buyCommunityToken(uint256 cid, uint256 nTokens) external validCommunityId(cid) payable {
        communities[cid].ctk.buyToken(nTokens, msg.sender);
    }

    // get all community list
    function getCommunityList() external view returns (Community[] memory) {
        return communities;
    }

    // create ar product 
    function createArtProduct(
        uint256 cid,
        string memory title, 
        string memory description, 
        uint256 price,
        bool isExclusive,
        string memory _ipfsHash,
        uint256 durationSec
    ) external validCommunityId(cid){
        
        communities[cid].artProductSystem.createProduct(
            msg.sender, title, description, price, isExclusive, _ipfsHash, durationSec);
    }

    // vote product
    function voteProduct(uint256 cid, uint256 productId, bool isUpVote) external validCommunityId(cid){
        communities[cid].artProductSystem.voteProduct(msg.sender, productId, isUpVote);
    }

    // get productList
    function getProductList(uint256 cid) external view validCommunityId(cid) returns (ArtProductSystem.ArtProduct[] memory){
        return communities[cid].artProductSystem.getProductList();
    }

    // get product list by owner
    function getProductListByOwner(uint256 cid) external view validCommunityId(cid) returns (ArtProductSystem.ArtProduct[] memory){
        return communities[cid].artProductSystem.getProductListByOwner(msg.sender);
    }

    // get product
    function getProduct(uint256 cid, uint256 productId) 
    external view validCommunityId(cid) returns(ArtProductSystem.ArtProduct memory){
        return communities[cid].artProductSystem.getProduct(productId);
    }

     // get product
    function verifyProduct(uint256 cid, uint256 productId) 
    external validCommunityId(cid) {
        communities[cid].artProductSystem.verifyProduct(productId);
    }
}
