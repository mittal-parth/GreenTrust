// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {ISuperfluid, ISuperToken, SuperAppBase, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
import {IDAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

error Unauthorized();

contract GreenPipeline {
    using IDAv1Library for IDAv1Library.InitData;
    using CFAv1Library for CFAv1Library.InitData;
    using SuperTokenV1Library for ISuperToken;

    IDAv1Library.InitData public idaV1;
    CFAv1Library.InitData public cfaV1;

    address public owner;

    ISuperToken public greenTrustToken;
    ISuperfluidToken public greenTrustFluidToken;

    mapping(address => bool) public accountList;

    constructor(
        ISuperfluid _host,
        ISuperToken _greenTrustToken,
        ISuperfluidToken _greenTrustFluidToken,
        address _owner
    ) {
        // Ensure _greenTrustToken is indeed a super token
        require(address(_host) == _greenTrustToken.getHost(), "!superToken");

        owner = _owner;
        greenTrustToken = _greenTrustToken;
        greenTrustFluidToken = _greenTrustFluidToken;

        // Initializing the host and agreement type in the idaV1 object so the object can have them on hand for enacting IDA functions
        // Read more on initialization: https://docs.superfluid.finance/superfluid/developers/solidity-examples/solidity-libraries/idav1-library#importing-and-initialization
        idaV1 = IDAv1Library.InitData(
            _host,
            IInstantDistributionAgreementV1(
                address(
                    _host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.InstantDistributionAgreement.v1"
                        )
                    )
                )
            )
        );

        cfaV1 = CFAv1Library.InitData(
            _host,
            //here, we are deriving the address of the CFA using the host contract
            IConstantFlowAgreementV1(
                address(
                    _host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );
    }

    uint256 public constant rewardPerCrop = 10;
    uint256 public constant subscriptionFlowRate = 10;

    struct CropReward {
        uint32 id;
        uint256 cropId;
        address payable[] stakeholders;
        uint256 maturityDate;
        bool isDistributed;
        bool isValid;
    }
    mapping(uint32 => CropReward) public cropRewards;
    mapping(uint256 => uint32) public cropToRewardId;
    uint32 public numCropRewards;

    /**************************************************************************
     * Access Control Operations
     *************************************************************************/

    function whitelistAccount(address _account) external {
        require(msg.sender == owner, "only owner can whitelist accounts");
        accountList[_account] = true;
    }

    function removeAccount(address _account) external {
        require(msg.sender == owner, "only owner can remove accounts");
        accountList[_account] = false;
    }

    function changeOwner(address _newOwner) external {
        require(msg.sender == owner, "only owner can change ownership");
        owner = _newOwner;
    }

    function sendLumpSumToContract(uint256 amount) external {
        require(
            msg.sender == owner || accountList[msg.sender] == true,
            "must be authorized"
        );
        greenTrustToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdrawFunds(uint256 amount) external {
        require(
            msg.sender == owner || accountList[msg.sender] == true,
            "must be authorized"
        );
        greenTrustToken.transfer(msg.sender, amount);
    }

    function getBalance() external view returns (uint256) {
        return greenTrustToken.balanceOf(address(this));
    }

    /**************************************************************************
     * CFA Operations
     *************************************************************************/

    function createFlowIntoContract(int96 flowRate) external {

        cfaV1.createFlowByOperator(
            msg.sender,
            address(this),
            greenTrustFluidToken,
            flowRate
        );
    }

    function updateFlowIntoContract(int96 newFlowRate) external {
        require(
            msg.sender == owner || accountList[msg.sender] == true,
            "must be authorized"
        );

        cfaV1.updateFlowByOperator(
            msg.sender,
            address(this),
            greenTrustFluidToken,
            newFlowRate
        );
    }

    function deleteFlowIntoContract() external {
        require(
            msg.sender == owner || accountList[msg.sender] == true,
            "must be authorized"
        );

        cfaV1.deleteFlow(msg.sender, address(this), greenTrustFluidToken);
    }

    function createFlowFromContract(address receiver, int96 flowRate) external {
        require(
            msg.sender == owner || accountList[msg.sender] == true,
            "must be authorized"
        );
        cfaV1.createFlow(receiver, greenTrustFluidToken, flowRate);
    }

    function updateFlowFromContract(address receiver, int96 newFlowRate)
        external
    {
        require(
            msg.sender == owner || accountList[msg.sender] == true,
            "must be authorized"
        );
        cfaV1.updateFlow(receiver, greenTrustFluidToken, newFlowRate);
    }

    function deleteFlowFromContract(address receiver) external {
        require(
            msg.sender == owner || accountList[msg.sender] == true,
            "must be authorized"
        );
        cfaV1.deleteFlow(address(this), receiver, greenTrustFluidToken);
    }

    /**************************************************************************
     * IDA Operations
     *************************************************************************/

    /// @notice Takes the entire balance of the designated greenTrustToken in the contract and distributes it out to unit holders w/ IDA
    function distribute(uint32 _cropRewardId) public {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();
        (uint256 actualDistributionAmount, ) = idaV1.ida.calculateDistribution(
            greenTrustToken,
            address(this),
            _cropRewardId,
            rewardPerCrop
        );

        idaV1.distribute(
            greenTrustToken,
            _cropRewardId,
            actualDistributionAmount
        );
    }

    /// @notice lets an account gain a single distribution unit
    /// @param subscriber subscriber address whose units are to be incremented
    function gainShare(address subscriber, uint32 _cropRewardId) public {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();
        // Get current units subscriber holds
        (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
            greenTrustToken,
            address(this),
            _cropRewardId,
            subscriber
        );

        // Update to current amount + 1
        idaV1.updateSubscriptionUnits(
            greenTrustToken,
            _cropRewardId,
            subscriber,
            uint128(currentUnitsHeld + 1)
        );
    }

    /// @notice lets an account lose a single distribution unit
    /// @param subscriber subscriber address whose units are to be decremented
    function loseShare(address subscriber, uint32 _cropRewardId) public {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();
        // Get current units subscriber holds
        (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
            greenTrustToken,
            address(this),
            _cropRewardId,
            subscriber
        );

        // Update to current amount - 1 (reverts if currentUnitsHeld - 1 < 0, so basically if currentUnitsHeld = 0)
        idaV1.updateSubscriptionUnits(
            greenTrustToken,
            _cropRewardId,
            subscriber,
            uint128(currentUnitsHeld - 1)
        );
    }

    /// @notice allows an account to delete its entire subscription this contract
    /// @param subscriber subscriber address whose subscription is to be deleted
    function deleteShares(address subscriber, uint32 _cropRewardId) public {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();
        idaV1.deleteSubscription(
            greenTrustToken,
            address(this),
            _cropRewardId,
            subscriber
        );
    }

    /**************************************************************************
     * Public Operations
     *************************************************************************/

    function distributeRewards() public {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();
        for (uint32 i = 1; i <= numCropRewards; i++) {
            if (
                cropRewards[i].isValid &&
                !cropRewards[i].isDistributed &&
                cropRewards[i].maturityDate <= block.timestamp
            ) {
                distribute(i);
                cropRewards[i].isDistributed = true;
            }
        }
    }

    function cancelReward(uint256 _cropId) public {
        require(cropToRewardId[_cropId] != 0, "C1");
        require(
            cropRewards[cropToRewardId[_cropId]].isValid &&
                !cropRewards[cropToRewardId[_cropId]].isDistributed,
            "C2"
        );
        cropRewards[cropToRewardId[_cropId]].isValid = false;
    }

    function addStakeholder(
        uint256 _cropId,
        address payable _stakeholder,
        uint256 duration
    ) public {
        if (!cropRewards[cropToRewardId[_cropId]].isValid) {
            numCropRewards++;
            cropToRewardId[_cropId] =  numCropRewards;
            cropRewards[numCropRewards].id = numCropRewards;
            cropRewards[cropToRewardId[_cropId]].isValid = true;
            cropRewards[cropToRewardId[_cropId]].cropId = _cropId;
            idaV1.createIndex(greenTrustToken, numCropRewards);
        }
        cropRewards[cropToRewardId[_cropId]].stakeholders.push(_stakeholder);
        cropRewards[cropToRewardId[_cropId]].maturityDate = duration;
        gainShare(_stakeholder, cropToRewardId[_cropId]);
    }
}
