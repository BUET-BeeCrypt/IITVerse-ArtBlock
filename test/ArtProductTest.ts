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

describe("ArtProductTest", () => {
    // test create new art product
    it("it should allow to create new art product", async () => {
      console.log("\n=========test create new art ==========");
      const { token, artblock,otherAccounts } = await loadFixture(deployOnceFixture);
      
      // buy ABX token
      await token.connect(otherAccounts[0]).buyTokens(5, {
        value: 10 // Specify the amount of wei to send with the transaction(i.e msg.value)
      });

      console.log("total token after buy: ", await token.balanceOf(otherAccounts[0].address));

      // create new community
      const tx = await artblock.connect(otherAccounts[0])
      .createCommunity(
        "test community kop",
        "test description kop",
      );

      // check community count
      expect(await artblock.getCommunityCount()).to.eq(1);

      // check community info
      const community = await artblock.getCommunity(0);
      console.log("community: ", community);
      expect(community.title).to.eq("test community kop");
      expect(community.description).to.eq("test description kop");
      expect(community.owner).to.eq(otherAccounts[0].address);

      const balance = await artblock.getCommunityToken(0, community.ctk);
      console.log("balance: ", balance);

      // buy CTK token
      await artblock.connect(otherAccounts[0]).buyCommunityToken(0, 5);

      // create new art product
      const tx2 = await artblock.connect(otherAccounts[0])
      .createArtProduct(
        0, // community id
        "test art product",
        "test art product description",
        50,
        false,
        "test art product url",
        1
      );

      // check art product info
      const artProduct = await artblock.getProduct(0, 0);
      console.log("at product: ", artProduct);

      // upvote
      await artblock.connect(otherAccounts[1]).voteProduct(0, 0, true);

      // sleep for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));

      // verify product
      await artblock.connect(otherAccounts[0]).verifyProduct(0, 0); // community id, product id

      // check product info
      const artProduct2 = await artblock.getProduct(0, 0);
      console.log("at product: ", artProduct2);

      // check upvoter list 
      ///const upvoters = await artblock.getUpvoterList(0, 0);
      //console.log(upvoters)
     // expect(upvoters.length).to.be.eq(1);
    }
  );
});
