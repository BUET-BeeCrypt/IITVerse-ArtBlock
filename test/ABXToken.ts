// FILEPATH: /f:/Competition/2023-iitverse/code/IITVerse-ArtBlock/test/ABXToken.ts

import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ABXToken } from '../frontend/typechain'
import exp from "constants";

async function deployOnceFixture() {
  const [owner, ...otherAccounts] = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("ABXToken", owner);
  const token = await tokenFactory.deploy("ABXToken", "ABX", ethers.utils.parseEther("0.05"), 2);
  await token.deployed();
  return { token, owner, otherAccounts };
}

describe("ABXToken", () => {
  it("should have correct initial supply", async () => {
    const { token } = await loadFixture(deployOnceFixture);
    console.log("total token: ", await token.totalSupply());
    expect(await token.totalSupply()).to.eq(ethers.utils.parseEther("0.05"));
  });

  it("should allow to buy tokens", async () => {
    const { token, owner, otherAccounts } = await loadFixture(deployOnceFixture);
    // log the blance of otherAccounts[0]
    const cost = 10; // 10 wei
    const blanceBefore = await otherAccounts[0].getBalance();
    console.log("otherAccounts[0] balance before buyTokens: ",blanceBefore);
    /* const tx = await otherAccounts[0].sendTransaction({
      to: token.address, // Send it to the token contract
      value: cost, // Specify the amount of Ether to send
      data: token.interface.encodeFunctionData("buyTokens", [5]) // Encode the function call
    }); */

    console.log("total token: ", await token.totalSupply());

    const tx = await token.connect(otherAccounts[0]).buyTokens(5, {
      value: cost // Specify the amount of wei to send with the transaction(i.e msg.value)
    });

    console.log("total token after buy: ", await token.totalSupply());
    console.log("total token in ABXToken: ", await token.balanceOf(owner.address));
    console.log("total token after buy: ", await token.balanceOf(otherAccounts[0].address));


    // log the blance of otherAccounts[0]
    const blanceAfter = await otherAccounts[0].getBalance();
    console.log("otherAccounts[0] balance after buyTokens: ", blanceAfter);

    // Check that the balance of the token contract has increased
  
    expect(await token.balanceOf(otherAccounts[0].address)).to.eq(5);

    const receipt = await tx.wait();
    // Get the gas price
    const gasPrice = tx.gasPrice;
    // Calculate the total cost (Ether sent + gas fee)
    const gasFee = gasPrice?.mul(receipt.gasUsed);
  
    // check balance of buyer
    expect(blanceAfter).to.eq(blanceBefore.sub(cost).sub(gasFee!));
  });

  it("should allow owner to set token price", async () => {
    const { token } = await loadFixture(deployOnceFixture);
    await token.setTokenPrice(ethers.utils.parseEther("2"));
    expect(await token.tokenPriceInWei()).to.eq(ethers.utils.parseEther("2"));
  });
});