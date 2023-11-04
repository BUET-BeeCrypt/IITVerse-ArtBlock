
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {CTK} from "./CTK.sol";
import {SimpleStaking} from "./SimpleStaking.sol";

contract ArtProductSystem {
    // stack amount
    uint256 public constant stack_Z = 5;

    struct ArtProduct {
        address owner;
        string title;
        string description;
        uint256 price;
        uint256 upVoteScore;
        uint256 downVoteScore;
        bool isApproved;
        bool isExclusive;
        string ipfsHash;
        uint256 createdAt;
        uint256 votingDuration;
        SimpleStaking staking;
    }

    CTK public ctkToken; // Reference to the CTk token contract
    ArtProduct[] public products;

    // map of owner products
    mapping(address => ArtProduct[]) public ownerProducts;

    // map of upvoter for a product
    mapping(uint256 => address[]) public upvoters;

    constructor(address _ctkToken) {
        ctkToken = CTK(_ctkToken);
    }

    modifier validProductId(uint256 pid) {
        require(pid < products.length, "invalid pid");
        _;
    }

    function createProduct(
        address _owner,
        string memory title, 
        string memory description, 
        uint256 price,
        bool isExclusive,
        string memory _ipfsHash,
        uint256 durationSec
    ) external {

        // create staking contract
        SimpleStaking staking = new SimpleStaking(ctkToken);
        staking.setTimestamp(durationSec);
        staking.stakeTokens(_owner, ctkToken, stack_Z);
        

        ArtProduct memory product = ArtProduct({
            owner: _owner,
            title: title,
            description: description,
            price: price,
            upVoteScore: 0,
            downVoteScore: 0,
            isApproved: false,
            isExclusive: isExclusive,
            ipfsHash: _ipfsHash,
            createdAt: block.timestamp,
            votingDuration: durationSec, // 6 minutes
            staking: staking
        });

        products.push(product);
        ownerProducts[_owner].push(product);
    }

    // get product count
    function getProductCount() external view returns (uint256) {
        return products.length;
    }

    // get product
    function getProduct(uint256 pid) external view validProductId(pid) returns (ArtProduct memory) {
        return products[pid];
    }

    // verify product
    function verifyProduct(uint256 productId) public validProductId(productId) {

        ArtProduct storage product = products[productId];
        if(product.isApproved == true) {
            revert("Product is already approved");
        }

        if(product.isApproved == false && (block.timestamp - product.createdAt) > product.votingDuration) {
            // voting is over check if verified
            if(product.upVoteScore > product.downVoteScore) {
                product.isApproved = true;

                // refund
                product.staking.unstakeTokensTo(ctkToken, stack_Z, product.owner);

                // give upvoter 1 ctk token
                for(uint256 i=0; i<upvoters[productId].length; i++) {
                    ctkToken.buyToken(1, upvoters[productId][i]);
                }
            }else{
                // voting is over and not approved
                product.staking.unstakeTokensTo(ctkToken, stack_Z, ctkToken.owner());
            }
        }
    }

    function getProductList() external view returns (ArtProduct[] memory) {
        return products;
    }

    function getProductListByOwner (address _owner) external view returns (ArtProduct[] memory) {
        return ownerProducts[_owner];
    }

    // vote product
    function voteProduct(address voter, uint256 productId, bool isUpVote) external {

        ArtProduct storage product = products[productId];
        if (product.owner == voter) {
            revert("You can't vote your own product");
        }
        if (product.isApproved == true) {
            revert("Product is already approved");
        }
        
        verifyProduct(productId);

        if (isUpVote) {
            product.upVoteScore += ctkToken.balanceOf(voter)+1;
            upvoters[productId].push(voter);
        } else {
            product.downVoteScore += ctkToken.balanceOf(voter)+1;
        }
    }
}