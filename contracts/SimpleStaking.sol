//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import ierc20.sol
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {CTK} from "./CTK.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// import openzepplin safe math
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// reference: https://github.com/ParaState/simple-staking-smart-contract/blob/main/SimpleStaking.sol
contract SimpleStaking is ReentrancyGuard{

    // Library usage
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    // Contract owner
    address public owner;

    // Timestamp related variables
    uint256 public initialTimestamp;
    bool public timestampSet;
    uint256 public timePeriod;


    // Token amount variables
    mapping(address => uint256) public alreadyWithdrawn;
    mapping(address => uint256) public balances;
    uint256 public contractBalance;

    // ERC20 contract address
    IERC20 public erc20Contract;

    // Events
    event tokensStaked(address from, uint256 amount);
    event TokensUnstaked(address to, uint256 amount);

    /// @dev Deploys contract and links the ERC20 token which we are staking, also sets owner as msg.sender and sets timestampSet bool to false.
    /// @param _erc20_contract_address.
    constructor(IERC20 _erc20_contract_address) {
        // Set contract owner
        owner = msg.sender;
        // Timestamp values not set yet
        timestampSet = false;
        // Set the erc20 contract address which this timelock is deliberately paired to
        require(address(_erc20_contract_address) != address(0), "_erc20_contract_address address can not be zero");
        erc20Contract = _erc20_contract_address;
    }


    // Modifier
    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Message sender must be the contract's owner.");
        _;
    }

    // Modifier
    /**
     * @dev Throws if timestamp already set.
     */
    modifier timestampNotSet() {
        require(timestampSet == false, "The time stamp has already been set.");
        _;
    }

    // Modifier
    /**
     * @dev Throws if timestamp not set.
     */
    modifier timestampIsSet() {
        require(timestampSet == true, "Please set the time stamp first, then try again.");
        _;
    }

    /// @dev Sets the initial timestamp and calculates minimum staking period in seconds i.e. 3600 = 1 hour
    /// @param _timePeriodInSeconds amount of seconds to add to the initial timestamp i.e. we are essemtially creating the minimum staking period here
    function setTimestamp(uint256 _timePeriodInSeconds) public onlyOwner timestampNotSet  {
        timestampSet = true;
        initialTimestamp = block.timestamp;
        timePeriod = initialTimestamp.add(_timePeriodInSeconds);
    }

    /// @dev Allows the contract owner to allocate official ERC20 tokens to each future recipient (only one at a time).
    /// @param token, the official ERC20 token which this contract exclusively accepts.
    /// @param amount to allocate to recipient.
    function stakeTokens(address _owner, CTK token, uint256 amount) public timestampIsSet {
        require(token == erc20Contract, "You are only allowed to stake the official erc20 token address which was passed into this contract's constructor");
        require(amount <= token.balanceOf(_owner), "Not enough STATE tokens in your wallet, please try lesser amount");
        token.transferCtk(_owner, address(this), amount);
        balances[_owner] = balances[msg.sender].add(amount);
        emit tokensStaked(_owner, amount);
    }

    /// @dev Allows user to unstake tokens after the correct time period has elapsed
    /// @param token - address of the official ERC20 token which is being unlocked here.
    /// @param amount - the amount to unlock (in wei)
    function unstakeTokens(IERC20 token, uint256 amount) public timestampIsSet nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient token balance, try lesser amount");
        require(token == erc20Contract, "Token parameter must be the same as the erc20 contract address which was passed into the constructor");
        if (block.timestamp >= timePeriod) {
            alreadyWithdrawn[msg.sender] = alreadyWithdrawn[msg.sender].add(amount);
            balances[msg.sender] = balances[msg.sender].sub(amount);
            token.safeTransfer(msg.sender, amount);
            emit TokensUnstaked(msg.sender, amount);
        } else {
            revert("Tokens are only available after correct time period has elapsed");
        }
    }

    function unstakeTokensTo(IERC20 token, uint256 amount, address _to) public timestampIsSet nonReentrant {
        require(balances[_to] >= amount, "Insufficient token balance, try lesser amount");
        require(token == erc20Contract, "Token parameter must be the same as the erc20 contract address which was passed into the constructor");
        if (block.timestamp >= timePeriod) {
            alreadyWithdrawn[_to] = alreadyWithdrawn[_to].add(amount);
            balances[_to] = balances[_to].sub(amount);
            token.safeTransfer(_to, amount);
            emit TokensUnstaked(_to, amount);
        } else {
            revert("Tokens are only available after correct time period has elapsed");
        }
    }

    /// @dev Transfer accidentally locked ERC20 tokens.
    /// @param token - ERC20 token address.
    /// @param amount of ERC20 tokens to remove.
    function transferAccidentallyLockedTokens(IERC20 token, uint256 amount) public onlyOwner {
        require(address(token) != address(0), "Token address can not be zero");
        // This function can not access the official timelocked tokens; just other random ERC20 tokens that may have been accidently sent here
        require(token != erc20Contract, "Token address can not be ERC20 address which was passed into the constructor");
        // Transfer the amount of the specified ERC20 tokens, to the owner of this contract
        token.safeTransfer(owner, amount);
    }

    
}