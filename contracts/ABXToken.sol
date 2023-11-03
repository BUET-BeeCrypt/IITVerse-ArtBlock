//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ABXToken is ERC20, Ownable {
    uint256 public tokenPriceInWei;  // The fixed price of ABX tokens in Wei

    constructor(string memory name, string memory symbol, uint256 initialSupplyInWei, uint256 priceInWei) ERC20(name, symbol) {
        _mint(msg.sender, initialSupplyInWei);
        tokenPriceInWei = priceInWei;
    }

    function buyTokens(uint256 numberOfTokens) external payable {
        uint256 totalCost = numberOfTokens * tokenPriceInWei;

        // Ensure the user has sent enough ether to purchase the tokens
        require(msg.value >= totalCost, "Insufficient ether sent");

        // transfer ether(wei) to the owner
        payable(owner()).transfer(totalCost);

        // Transfer the tokens to the user
        _transfer(owner(), msg.sender, numberOfTokens);

        // Refund any excess ether sent by the user
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
    }
    
    // Function to set the token price (only the owner can update it)
    function setTokenPrice(uint256 newPriceInWei) external onlyOwner {
        tokenPriceInWei = newPriceInWei;
    }
}
