//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {CTK} from "./CTK.sol";
import {ArtProductSystem} from "./ArtProductSystem.sol";
import {DutchAuction} from "./DutchAuction.sol";

import "hardhat/console.sol";

// reference: https://betterprogramming.pub/creating-an-nft-marketplace-solidity-2323abca6346

contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    address payable owner; 

    mapping(uint256 => ArtNFT) private idToArtNFT;

    struct ArtNFT {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 cid; // community id
      uint256 pid; // product id
      CTK ctk;
      bool sold;
    }


    event ArtNFTCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 cid,
      uint256 pid,
      bool sold
    );



    constructor() ERC721("WEB3 DAO Tokens", "WDAO") {
      owner = payable(msg.sender);
    }

    // map of tokenId to dutch auction
    mapping(uint256 => DutchAuction) public tokenIdToDutchAuction;

    // dutch aunction function with tokenId, startingPrice, decrementRate, minimumPrice, duration
    function createDutchAuction(uint256 tokenId, uint256 startingPrice, uint256 decrementRate, uint256 minimumPrice, uint256 duration) public {
      DutchAuction dutchAuction = new DutchAuction(startingPrice, decrementRate, address(this), tokenId);
      tokenIdToDutchAuction[tokenId] = dutchAuction;
    }

    // buy dutch auction
    function buyDutchAuction(uint256 tokenId) public payable {
      DutchAuction dutchAuction = tokenIdToDutchAuction[tokenId];
      dutchAuction.buy{value: msg.value}();
    }


    function createToken(string memory tokenURI, uint256 cid, uint256 pid, address ctx) public payable returns (uint) {
      _tokenIds.increment();

      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      

      idToArtNFT[newTokenId] =  ArtNFT(
        newTokenId,
        payable(msg.sender),
        payable(address(this)),
        cid,
        pid,
        CTK(ctx),
        false
      );

      _transfer(msg.sender, address(this), newTokenId);
      emit ArtNFTCreated(
        newTokenId,
        msg.sender,
        address(this),
        cid,
        pid,
        false
      );

      return newTokenId;
    }



    function resellTokenTo(address _to, uint256 tokenId, uint256 price) public payable {
      require(idToArtNFT[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      idToArtNFT[tokenId].sold = false;

      _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId, uint256 price) external {
      require(idToArtNFT[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(idToArtNFT[tokenId].ctk.balanceOf(msg.sender) >= price, "Only item owner can perform this operation");
      idToArtNFT[tokenId].sold = true;
      _itemsSold.increment();
      idToArtNFT[tokenId].ctk.transferCtk(msg.sender, idToArtNFT[tokenId].seller, price);
      _transfer(msg.sender, idToArtNFT[tokenId].seller, tokenId);
    }


    function fetchMarketItems() public view returns (ArtNFT[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      ArtNFT[] memory items = new ArtNFT[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {

        if (idToArtNFT[i + 1].owner == address(this)) {

          uint currentId = i + 1;

          ArtNFT storage currentItem = idToArtNFT[currentId];

          items[currentIndex] = currentItem;

          currentIndex += 1;
        }
      }

      return items;
    }


    function fetchMyNFTs() public view returns (ArtNFT[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;


      for (uint i = 0; i < totalItemCount; i++) {
        // check if nft is mine
        if (idToArtNFT[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      ArtNFT[] memory items = new ArtNFT[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {

        if (idToArtNFT[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          ArtNFT storage currentItem = idToArtNFT[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function fetchItemsListed() public view returns (ArtNFT[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToArtNFT[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      ArtNFT[] memory items = new ArtNFT[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToArtNFT[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          ArtNFT storage currentItem = idToArtNFT[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      
      return items;
    }
}