//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import ierc20.sol
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import { ABXToken } from "./ABXToken.sol";


// create community ERC token
contract CTK is ERC20, Ownable {
    ABXToken public abxToken;
    // 1 ABX = 1 * 10 ** 18 CTK
    uint256 public pricePerUnit; // The fixed price of CTK tokens in abx wei

    constructor(address _abxTokenAddres, uint256 _pricePerUnit) ERC20("Community Token", "CTK") {
        abxToken = ABXToken(_abxTokenAddres);
        pricePerUnit = _pricePerUnit;
    }

    // create token
    function createToken(uint256 numberOfTokens) external onlyOwner {
        _mint(address(this), numberOfTokens*10**18);
    }

    // get price per unit
    function getPricePerUnit() external view returns (uint256) {
        return pricePerUnit;
    }
    
    // buy community token
    function buyToken(uint256 numberOfTokens, address _buyer) external payable {
        // transfer CTK tokens from the contract to the user
        _transfer(address(this), _buyer, numberOfTokens);
        console.log("CTK: transfered %d tokens to %s", numberOfTokens, msg.sender);
    }
}
