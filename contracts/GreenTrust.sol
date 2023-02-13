// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "./GreenTrustFarmer.sol";
import "./GreenTrustConsumer.sol";
import "./GreenTrustVerifier.sol";

contract GreenTrust is
    GreenTrustFarmer,
    GreenTrustConsumer,
    GreenTrustVerifier
{
    // Open to all Functions

    function registerConsumer(string memory _name)
        public
        returns (Consumer memory)
    {
        require(
            addressToFarmerIds[msg.sender] == 0,
            "Farmer already registered with this wallet"
        );
        require(
            addressToVerifierIds[msg.sender] == 0,
            "Verifier already registered with this wallet"
        );
        require(
            addressToConsumerIds[msg.sender] == 0,
            "Consumer already registered with this wallet"
        );
        Consumer memory temp = Consumer(
            consumers.length + 1,
            payable(msg.sender),
            _name,
            true
        );
        addressToConsumerIds[msg.sender] = consumers.length + 1;
        consumers.push(temp);
        emit consumerRegistered(msg.sender, _name, consumers.length);
        return consumers[consumers.length - 1];
    }

    function registerVerifier(
        string memory _name,
        string memory _currentAddress,
        string[] memory _idCards
    ) public returns (Verifier memory) {
        require(
            addressToFarmerIds[msg.sender] == 0,
            "Farmer already registered with this wallet"
        );
        require(
            addressToVerifierIds[msg.sender] == 0,
            "Verifier already registered with this wallet"
        );
        require(
            addressToConsumerIds[msg.sender] == 0,
            "Consumer already registered with this wallet"
        );
        Verifier memory temp = Verifier(
            verifiers.length + 1,
            payable(msg.sender),
            _name,
            _currentAddress,
            _idCards,
            true
        );
        addressToVerifierIds[msg.sender] = verifiers.length + 1;
        verifiers.push(temp);
        emit verifierRegistered(msg.sender, _name, verifiers.length);
        return verifiers[verifiers.length - 1];
    }

    function registerFarmer(
        string memory _name,
        string memory _currentAddress,
        string memory _farmerId,
        string memory _govtId,
        string[] memory _idCards
    ) public returns (Farmer memory) {
        require(
            addressToFarmerIds[msg.sender] == 0,
            "Farmer already registered with this wallet"
        );
        require(
            addressToVerifierIds[msg.sender] == 0,
            "Verifier already registered with this wallet"
        );
        require(
            addressToConsumerIds[msg.sender] == 0,
            "Consumer already registered with this wallet"
        );
        Farmer memory temp = Farmer(
            farmers.length + 1,
            payable(msg.sender),
            _name,
            _currentAddress,
            _farmerId,
            _govtId,
            _idCards,
            true
        );
        addressToFarmerIds[msg.sender] = farmers.length + 1;
        farmers.push(temp);
        emit farmerRegistered(msg.sender, _name, farmers.length);
        return farmers[farmers.length - 1];
    }

    // Common Functions

    function fetchUserType() public view returns (string memory) {
        require(
            addressToFarmerIds[msg.sender] != 0 ||
                addressToVerifierIds[msg.sender] != 0 ||
                addressToConsumerIds[msg.sender] != 0,
            "User is not registered"
        );
        if (addressToFarmerIds[msg.sender] != 0) {
            return "farmer";
        } else if (addressToVerifierIds[msg.sender] != 0) {
            return "verifier";
        }
        return "consumer";
    }

    function AddChallenge(uint256 _challenged, ChallengeStatus _status)
        public
        returns (Challenge memory)
    {
        require(
            addressToFarmerIds[msg.sender] != 0 ||
                addressToVerifierIds[msg.sender] != 0 ||
                addressToConsumerIds[msg.sender] != 0,
            "User not registered"
        );
        require(crops[_challenged].isValid, "Crop does not exist");
        Challenge memory temp = Challenge(
            challenges.length + 1,
            0,
            payable(msg.sender),
            _challenged,
            _status,
            true
        );
        challenges.push(temp);
        emit challengeAdded(
            challenges.length,
            _challenged,
            _status,
            msg.sender
        );
        return challenges[challenges.length - 1];
    }

    function AddStake(uint256 _cropId, uint256 _amount)
        public
        returns (Stake memory)
    {
        require(
            addressToFarmerIds[msg.sender] != 0 ||
                addressToVerifierIds[msg.sender] != 0 ||
                addressToConsumerIds[msg.sender] != 0,
            "User not registered"
        );
        require(crops[_cropId].isValid, "Crop does not exist");
        require(
            crops[_cropId].status == CropStatus.OPEN,
            "Crop not in progress"
        );
        require(
            farms[crops[_cropId].farmId].farmerId !=
                addressToFarmerIds[msg.sender],
            "Farmer cannot stake on his own crop"
        );
        Stake memory temp = Stake(
            stakes.length + 1,
            _amount,
            _cropId,
            payable(msg.sender),
            defaultStakeStatus,
            true
        );
        stakes.push(temp);
        emit stakeAdded(stakes.length, _cropId, _amount, msg.sender);
        return stakes[stakes.length - 1];
    }

    function AcceptChallenge(uint256 _challengeId)
        public
        returns (Challenge memory)
    {
        require(addressToVerifierIds[msg.sender] != 0, "User not a Verifier");
        require(challenges[_challengeId].isValid, "Challenge does not exist");
        challenges[_challengeId].status = ChallengeStatus.ALLOTTED;
        challenges[_challengeId].verifierId = addressToVerifierIds[msg.sender];
        emit challengeAccepted(
            _challengeId,
            challenges[_challengeId].challenged,
            challenges[_challengeId].status,
            challenges[_challengeId].challenger
        );
        return challenges[_challengeId];
    }
}
