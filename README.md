# Hardhat Full Stack Dapp Boilerplate

A fullstack hardhat and wagmi based dapp boilerplate ready to hack 🙌

## Used Technology
 - [👷🏽‍♂️ Hardhat](https://www.rainbowkit.com/)
 - [🌈 RainbowKit](https://hardhat.org/)
 - [➬ WAGMI](https://wagmi.sh/)
 - [🌐 Next JS](https://nextjs.org/)
 - [🗺 Etherscan](https://etherscan.io/)
 - [🕹 Typechain](https://github.com/dethcrypto/TypeChain)
 - [TailwindCSS](https://tailwindcss.com) – Utility-first CSS framework for rapid UI development
 - [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
 - [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
 - [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

## Prerequisite
```
Node js
npm
yarn
```
## Install dependencies
Install yarn:
```
npm i -g yarn
```
For contract dev:
Run this command on the root folder:
```
yarn
```

For Frontend dev:
Go to `frontend` folder and install node modules:
```
cd frontend
yarn

```

## Instruction
- Install a wallet like [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
- Copy `.env.example` to `.env`
  * Mac or Linux
    * ```cp .env.example .env```
  * Windows
    * ```copy .env.example .env```
- Set the env variable in `.env` file on root level and on `frontend` folder:

Variable descriptions:

1. `RPC_NODE_API_KEY`: Get from [Alchemy site](https://auth.alchemy.com/signup/) after sign up and login
2. `PRIVATE_KEY`: Export private key from metamask, follow these [instructions](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)
3. `ETHERSCAN_API_KEY`: Get from [etherscan](https://etherscan.io/login)

Frontend ENV Variable:
4. `NEXT_PUBLIC_ALCHEMY_API_KEY` : Same as `RPC_NODE_API_KEY` 
- Compile Contract:
```
npm run compile
```
- Run test:
```
npm run test
```
- Deploy
```
npm run deploy:<network>
```
- Verify on etherscan
```
npx hardhat verify --network sepolia <YOUR_CONTRACT_ADDRESS> <Paramaters>
```
For example for `Greeter` contract:
```
npx hardhat verify --network sepolia 0xAECD7dFD9d5ED08EA916B052D90A75366B963A61 "Hello world"
```

## Deployed Smart contract on Etherscan
- [ABXToken - https://sepolia.etherscan.io/token/0x3197e50a9FFE8FFe261C136802e906aA1E1Ed52A](https://sepolia.etherscan.io/token/0x0423386cb8C20fc7cAb942b3d1eC55C11E6f155E)
- [ArtBlock - https://sepolia.etherscan.io/token/0x3197e50a9FFE8FFe261C136802e906aA1E1Ed52A](https://sepolia.etherscan.io/token/0x0046BDfa00630f7d7684F1eFF873e4f73C58B9ca)
- [NFTMarketplace - https://sepolia.etherscan.io/token/0x3197e50a9FFE8FFe261C136802e906aA1E1Ed52A](https://sepolia.etherscan.io/token/0x3197e50a9FFE8FFe261C136802e906aA1E1Ed52A)

## Smart Contracts Docs

### ABXToken.sol

`ABXToken.sol` is a smart contract for managing the ABX token. It includes functions for buying tokens, setting the token price, and transferring tokens between addresses. Here's a brief overview of the main functions:

- `buyTokens(uint256 _numberOfTokens)`: This function allows a user to buy a specified number of tokens by sending the appropriate amount of ether. Any excess ether sent is refunded.
- `setTokenPrice(uint256 _newPrice)`: This function allows the contract owner to set a new price for the token in Wei.
- `transferToken(address _to, uint256 _numberOfTokens)`: This function transfers a specified amount of tokens from the contract owner's address to another address.

### CTK.sol

`CTK.sol` is a smart contract for managing the Community Token (CTK). It includes functions for creating tokens, getting the price per unit, buying tokens, and transferring tokens between addresses. Here's a brief overview of the main functions:

- `constructor(address _abxTokenAddres, uint256 _pricePerUnit)`: This function initializes the CTK contract, sets the ABXToken contract address and the price per unit of CTK tokens.
- `createToken(uint256 numberOfTokens)`: This function allows the contract owner to mint a specified number of tokens.
- `getPricePerUnit()`: This function returns the price per unit of CTK tokens.
- `buyToken(uint256 numberOfTokens, address _buyer)`: This function allows a user to buy a specified number of tokens.
- `transferCtk(address _from,address  _to, uint256 _amount)`: This function transfers a specified amount of tokens from one address to another.

### ArtProductSystem.sol

`ArtProductSystem.sol` is a smart contract for managing the Art Product System. It includes functions for creating products, getting products, verifying products, and voting for products. Here's a brief overview of the main functions:

- `constructor(address _ctkToken)`: This function initializes the ArtProductSystem contract, sets the CTK token contract address.
- `createProduct(address _owner, string memory title, string memory description, uint256 price, bool isExclusive, string memory _ipfsHash, uint256 durationSec)`: This function allows the contract owner to create a new product.
- `getProductCount()`: This function returns the total number of products.
- `getProduct(uint256 pid)`: This function returns the product with the given id.
- `verifyProduct(uint256 productId)`: This function verifies a product based on its upVoteScore and downVoteScore.
- `getProductList()`: This function returns a list of all products.
- `getProductListByOwner(address _owner)`: This function returns a list of all products owned by a specific owner.
- `voteProduct(address voter, uint256 productId, bool isUpVote)`: This function allows a user to vote for a product.

### ArtBlock.sol

`ArtBlock.sol` is a smart contract for managing the ArtBlock community. It includes functions for creating communities, getting communities, buying community tokens, creating art products, voting for products, and verifying products. Here's a brief overview of the main functions:

- `constructor(address _abxToken)`: This function initializes the ArtBlock contract, sets the ABXToken contract address.
- `createCommunity(string memory title, string memory description)`: This function allows a user to create a new community.
- `getCommunityCount()`: This function returns the total number of communities.
- `getCommunity(uint256 cid)`: This function returns the community with the given id.
- `getCommunityToken(uint256 cid, address user)`: This function returns the number of community tokens owned by a user.
- `buyCommunityToken(uint256 cid, uint256 nTokens)`: This function allows a user to buy a specified number of community tokens.
- `getCommunityList()`: This function returns a list of all communities.
- `createArtProduct(uint256 cid, string memory title, string memory description, uint256 price, bool isExclusive, string memory _ipfsHash, uint256 durationSec)`: This function allows a user to create a new art product in a community.
- `voteProduct(uint256 cid, uint256 productId, bool isUpVote)`: This function allows a user to vote for a product.
- `getProductList(uint256 cid)`: This function returns a list of all products in a community.
- `getProductListByOwner(uint256 cid)`: This function returns a list of all products owned by the caller in a community.
- `getProduct(uint256 cid, uint256 productId)`: This function returns the product with the given id in a community.
- `verifyProduct(uint256 cid, uint256 productId)`: This function verifies a product in a community.

### SimpleStaking.sol

`SimpleStaking.sol` is a smart contract for managing the staking of tokens. It includes functions for staking tokens, unstaking tokens, setting timestamps, and transferring accidentally locked tokens. Here's a brief overview of the main functions:

- `constructor(IERC20 _erc20_contract_address)`: This function initializes the SimpleStaking contract, sets the ERC20 token contract address, and sets the contract owner.
- `setTimestamp(uint256 _timePeriodInSeconds)`: This function sets the initial timestamp and calculates the minimum staking period in seconds.
- `stakeTokens(address _owner, CTK token, uint256 amount)`: This function allows a user to stake a specified number of tokens.
- `unstakeTokens(IERC20 token, uint256 amount)`: This function allows a user to unstake a specified number of tokens after the correct time period has elapsed.
- `unstakeTokensTo(IERC20 token, uint256 amount, address _to)`: This function allows a user to unstake a specified number of tokens to a specific address after the correct time period has elapsed.
- `transferAccidentallyLockedTokens(IERC20 token, uint256 amount)`: This function allows the contract owner to transfer accidentally locked tokens.

Reference: [SimpleStaking.sol on GitHub](https://github.com/ParaState/simple-staking-smart-contract/blob/main/SimpleStaking.sol)

### NFTMarketplace.sol

`NFTMarketplace.sol` is a smart contract for managing the NFT Marketplace. It includes functions for creating and managing Art NFTs. Here's a brief overview of the main functions:

- `constructor()`: This function initializes the NFTMarketplace contract and sets the contract owner.
- `ArtNFT`: This is a struct that represents an Art NFT. It includes the tokenId and the seller's address.
- `idToArtNFT`: This is a mapping from tokenIds to ArtNFTs. It allows the contract to keep track of all the Art NFTs that have been created.
- `createToken()`: This function allows a user to create a new token.
- `resellTokenTo()`: This function allows a user to resell a token to another user.
- `createMarketSale()`: This function allows a user to create a market sale.
- `fetchMarketItems()`: This function fetches all the items in the market.
- `fetchMyNFTs()`: This function fetches all the NFTs owned by the caller.
- `fetchItemsListed()`: This function fetches all the items listed by the caller.

Reference: https://betterprogramming.pub/creating-an-nft-marketplace-solidity-2323abca6346


### DutchAuction.sol

`DutchAuction.sol` is a smart contract for managing a Dutch Auction of an NFT. It includes functions for getting the price of the NFT and buying the NFT. Here's a brief overview of the main functions:

- `constructor(uint _startingPrice, uint _discountRate, address _nft, uint _nftId)`: This function initializes the DutchAuction contract, sets the starting price, discount rate, NFT contract address, and NFT id.
- `getPrice()`: This function calculates and returns the current price of the NFT based on the time elapsed since the start of the auction and the discount rate.
- `buy()`: This function allows a user to buy the NFT if they send enough ETH and the auction has not expired. Any excess ETH sent is refunded.

Reference: https://solidity-by-example.org/app/dutch-auction/