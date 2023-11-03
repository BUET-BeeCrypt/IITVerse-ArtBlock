// FILEPATH: /f:/Competition/2023-iitverse/code/IITVerse-ArtBlock/test/ABXToken.ts

import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ABXToken, CTK, ArtBlock } from '../frontend/typechain'
import exp from "constants";

async function deployOnceFixture() {
  const [owner, ...otherAccounts] = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("ABXToken", owner);
  const token = await tokenFactory.deploy("ABXToken", "ABX", ethers.utils.parseEther("0.05"), 2);
  await token.deployed();

  // deploy artblock
  const artblockFactory = await ethers.getContractFactory("ArtBlock");
  const artblock = await artblockFactory.deploy(token.address);
  await artblock.deployed();


  return { token, artblock, owner, otherAccounts };
}

describe("ArtBlock", () => {
    it("it should allow to create new community", async () => {
      const { token, artblock,otherAccounts } = await loadFixture(deployOnceFixture);
      
      await token.connect(otherAccounts[0]).buyTokens(5, {
        value: 10 // Specify the amount of wei to send with the transaction(i.e msg.value)
      });

      console.log("total token after buy: ", await token.balanceOf(otherAccounts[0].address));

      // create new community
      const tx = await artblock.connect(otherAccounts[0])
      .createCommunity(
        "test community",
        "test description",
      );

      // print events
      //const receipt = await tx.wait();
      //console.log("events: ", receipt.events);

      // check community count
      expect(await artblock.getCommunityCount()).to.eq(1);

      // check community info
      const community = await artblock.getCommunity(0);
      console.log("community: ", community);
      expect(community.title).to.eq("test community");
      expect(community.description).to.eq("test description");
      expect(community.owner).to.eq(otherAccounts[0].address);

      const balance = await artblock.getCommunityToken(0, community.ctk);
      console.log("balance: ", balance);
    });

    // test invalid community id
    it("it should not allow to get a community with invalid id", async () => {
      const { artblock, otherAccounts } = await loadFixture(deployOnceFixture);
      await expect(artblock.getCommunity(1)).to.be.revertedWith("invalid community id");

      await expect(artblock.getCommunityToken(1, otherAccounts[0].address)).to.be.revertedWith("invalid community id");
    });


    it("it should allow to buy community token", async () => {
      const { token, artblock,otherAccounts } = await loadFixture(deployOnceFixture);

      console.log("\nbuy community token test")
      console.log("creator: "+otherAccounts[0].address);
      console.log("member: "+otherAccounts[1].address);
      
      await token.connect(otherAccounts[0]).buyTokens(5, {
        value: 10 // Specify the amount of wei to send with the transaction(i.e msg.value)
      });

      await token.connect(otherAccounts[1]).buyTokens(10, {
        value: 20 // Specify the amount of wei to send with the transaction(i.e msg.value)
      });

      // create new community
      const tx = await artblock.connect(otherAccounts[0])
      .createCommunity(
        "test community",
        "test description",
      );

      // check community count
      expect(await artblock.getCommunityCount()).to.eq(1);

      // check community info
      const community = await artblock.connect(otherAccounts[1]).getCommunity(0);

      const balance = await artblock.getCommunityToken(0, community.ctk);
      console.log("balance before: ", balance);

      await artblock.connect(otherAccounts[1]).buyCommunityToken(0, 5);

      const balanceAfter = await artblock.getCommunityToken(0, community.ctk);
      console.log("balance after: ", balanceAfter);

      expect(balanceAfter).to.eq(balance.sub(5));

      expect(5).to.eq(await artblock.getCommunityToken(0, otherAccounts[1].address))

    });

    // test getCommunityList
  it("should return the community list", async () => {
    const { token, artblock,otherAccounts } = await loadFixture(deployOnceFixture);

    console.log("\ncommunity list test")
    console.log("creator: "+otherAccounts[0].address);
    console.log("member: "+otherAccounts[1].address);

    await token.connect(otherAccounts[0]).buyTokens(5, {
      value: 10 // Specify the amount of wei to send with the transaction(i.e msg.value)
    });

    await token.connect(otherAccounts[1]).buyTokens(10, {
      value: 20 // Specify the amount of wei to send with the transaction(i.e msg.value)
    });

    // create new community
    await artblock.connect(otherAccounts[0])
      .createCommunity(
        "test community",
        "test description",
      );

    console.log("community 1 created");

    // create new community
    await artblock.connect(otherAccounts[1])
      .createCommunity(
        "test community 2",
        "test description 2",
      );

    console.log("community 2 created");

    const communityList = await artblock.getCommunityList();
    expect(communityList.length).to.eq(2);

    for (let i = 0; i < communityList.length; i++) {
      // print title 
      console.log("community title: ", communityList[i].title);
    }
  });
});
