import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';

const contractDetailsDataPath = path.join(__dirname, "../", "frontend", "src", "info", "contractDetails.json");


const jsonData = fs.readFileSync(contractDetailsDataPath, 'utf8');
const jsonObject = JSON.parse(jsonData);

async function deployABXToken() {
  const [owner] = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("ABXToken", owner);
  const token = await tokenFactory.deploy("ABXToken", "ABX", ethers.utils.parseEther("0.05"), 2);
  await token.deployed();
  return token.address;
}


async function main() {
  jsonObject.adxTokenContractAddress = await deployABXToken();
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
