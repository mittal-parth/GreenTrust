// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "./GreenTrustFarmer.sol";
import "./GreenLeaves.sol";

contract GreenTrust is GreenTrustFarmer {
    uint256 public constant challengeAmount = 1000000;
    enum ChallengeStatus {
        OPEN,
        ALLOTTED,
        REJECTED,
        SUCCESSFUL
    }
    ChallengeStatus public constant defaultChallengeStatus =
        ChallengeStatus.OPEN;

    struct Challenge {
        uint256 id;
        uint256 verifierId;
        address payable challenger;
        uint256 challenged;
        ChallengeStatus status;
        string description;
        string documents;
        bool isValid;
    }
    mapping(uint256 => Challenge) public challenges;
    uint256 public numChallenges;

    struct Verifier {
        uint256 id;
        address payable walletAddress;
        string name;
        string currentAddress;
        string idCards;
        bool isValid;
    }
    mapping(address => uint256) public addressToVerifierIds;
    mapping(uint256 => Verifier) public verifiers;
    uint256 public numVerifiers;

    // Open to all Functions

    function registerVerifier(
        string memory _name,
        string memory _currentAddress,
        string memory _idCards
    ) public {
        require(addressToFarmerIds[msg.sender] == 0, "F1");
        require(addressToVerifierIds[msg.sender] == 0, "V1");
        numVerifiers++;
        verifiers[numVerifiers].id = numVerifiers;
        verifiers[numVerifiers].walletAddress = payable(msg.sender);
        verifiers[numVerifiers].name = _name;
        verifiers[numVerifiers].currentAddress = _currentAddress;
        verifiers[numVerifiers].idCards = _idCards;
        verifiers[numVerifiers].isValid = true;
        addressToVerifierIds[msg.sender] = numVerifiers;
    }

    function registerFarmer(string memory _profile, string memory _idCards)
        public
    {
        require(addressToFarmerIds[msg.sender] == 0, "F1");
        require(addressToVerifierIds[msg.sender] == 0, "V1");
        numFarmers++;
        farmers[numFarmers].id = numFarmers;
        farmers[numFarmers].walletAddress = payable(msg.sender);
        farmers[numFarmers].profile = _profile;
        farmers[numFarmers].idCards = _idCards;
        farmers[numFarmers].isValid = true;
        addressToFarmerIds[msg.sender] = numFarmers;
    }

    // Common Functions

    function fetchUserType() public view returns (string memory) {
        if (addressToFarmerIds[msg.sender] != 0) {
            return "farmer";
        } else if (addressToVerifierIds[msg.sender] != 0) {
            return "verifier";
        }
        return "NR";
    }

    function addChallenge(
        uint256 _challenged,
        string memory description,
        string memory documents
    ) public payable {
        require(
            addressToFarmerIds[msg.sender] != 0 ||
                addressToVerifierIds[msg.sender] != 0,
            "U0"
        );
        require(crops[_challenged].isValid, "Cr0");
        require(msg.value == challengeAmount, "CA0");
        numChallenges++;
        challenges[numChallenges].id = numChallenges;
        challenges[numChallenges].challenger = payable(msg.sender);
        challenges[numChallenges].challenged = _challenged;
        challenges[numChallenges].status = defaultChallengeStatus;
        challenges[numChallenges].description = description;
        challenges[numChallenges].documents = documents;
        challenges[numChallenges].isValid = true;
    }

    function addStake(uint256 _cropId) public payable {
        require(
            addressToFarmerIds[msg.sender] != 0 ||
                addressToVerifierIds[msg.sender] != 0,
            "U0"
        );
        require(crops[_cropId].isValid, "C0");
        require(crops[_cropId].status == CropStatus.OPEN, "C0P");
        require(
            farms[crops[_cropId].farmId].farmerId !=
                addressToFarmerIds[msg.sender],
            "F0St"
        );
        require(hasStaked[_cropId][msg.sender] != true, "St1");
        require(msg.value == crops[_cropId].stakeAmount, "SA0");
        numStakes++;
        stakes[numStakes].id = numStakes;
        stakes[numStakes].cropId = _cropId;
        stakes[numStakes].stakeholder = payable(msg.sender);
        stakes[numStakes].status = defaultStakeStatus;
        stakes[numStakes].isValid = true;
        hasStaked[_cropId][msg.sender] = true;
    }

    function claimChallenge(uint256 _challengeId) public {
        require(addressToVerifierIds[msg.sender] != 0, "U0V");
        require(challenges[_challengeId].isValid, "Ch0");
        challenges[_challengeId].status = ChallengeStatus.ALLOTTED;
        challenges[_challengeId].verifierId = addressToVerifierIds[msg.sender];
    }

    function returnStake(uint256 _stakeId) public {
        require(stakes[_stakeId].isValid, "St0");
        require(stakes[_stakeId].stakeholder == msg.sender, "St0U");
        require(stakes[_stakeId].status == defaultStakeStatus, "St0S");
        require(crops[stakes[_stakeId].cropId].harvestedOn != 0, "St0H");
        require(
            crops[stakes[_stakeId].cropId].status != CropStatus.CLOSED,
            "St0C"
        );
        require(
            block.timestamp >
                crops[stakes[_stakeId].cropId].harvestedOn + 90 days,
            "St0T"
        );
        stakes[_stakeId].status = StakeStatus.RELEASED;
        crops[stakes[_stakeId].cropId].status = CropStatus.CLOSED;
        payable(msg.sender).transfer(
            crops[stakes[_stakeId].cropId].stakeAmount
        );
    }

    function giveVerdict(uint256 _challengeId, ChallengeStatus _status) public {
        require(challenges[_challengeId].isValid, "Ch0");
        require(
            challenges[_challengeId].status == ChallengeStatus.ALLOTTED,
            "Ch0S"
        );
        require(
            challenges[_challengeId].verifierId ==
                addressToVerifierIds[msg.sender],
            "Ch0V"
        );
        challenges[_challengeId].status = _status;
        if (_status == ChallengeStatus.SUCCESSFUL) {
            crops[challenges[_challengeId].challenged].status = CropStatus
                .CLOSED;
            uint256 tempNumStakes;
            for (uint256 i = 1; i <= numStakes; i++) {
                if (stakes[i].cropId == challenges[_challengeId].challenged) {
                    tempNumStakes++;
                    stakes[i].status = StakeStatus.UNSUCCESSFUL;
                }
            }
            crops[challenges[_challengeId].challenged].status = CropStatus
                .CLOSED;
            challenges[_challengeId].challenger.transfer(
                crops[challenges[_challengeId].challenged].stakeAmount *
                    tempNumStakes
            );
        }
        payable(msg.sender).transfer(challengeAmount);
    }

    function fetchCropChallenges(uint256 _cropId)
        public
        view
        returns (Challenge[] memory)
    {
        require(crops[_cropId].isValid, "C0");

        uint256 tempNumChallenges;
        uint256 j;
        for (uint256 i = 1; i <= numChallenges; i++) {
            if (challenges[i].challenged == _cropId) {
                tempNumChallenges++;
            }
        }
        Challenge[] memory cropChallenges = new Challenge[](tempNumChallenges);
        for (uint256 i = 0; i < tempNumChallenges; i++) {
            cropChallenges[j] = challenges[i];
            j++;
        }
        return cropChallenges;
    }

    function fetchAllChallenges() public view returns (Challenge[] memory) {
        Challenge[] memory allChallenges = new Challenge[](numChallenges);
        for (uint256 i = 1; i <= numChallenges; i++) {
            allChallenges[i - 1] = challenges[i];
        }
        return allChallenges;
    }

    function fetchVerifierChallenges(uint256 _verifierId)
        public
        view
        returns (Challenge[] memory)
    {
        require(verifiers[_verifierId].isValid, "V0");
        uint256 tempNumChallenges;
        uint256 j;
        for (uint256 i = 1; i <= numChallenges; i++) {
            if (challenges[i].verifierId == _verifierId) {
                tempNumChallenges++;
            }
        }
        Challenge[] memory verifierChallenges = new Challenge[](
            tempNumChallenges
        );
        for (uint256 i = 0; i < tempNumChallenges; i++) {
            verifierChallenges[j] = challenges[i];
            j++;
        }
        return verifierChallenges;
    }
}
