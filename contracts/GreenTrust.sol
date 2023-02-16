// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "./GreenTrustFarmer.sol";
import "./GreenTrustVerifier.sol";
import "./GreenLeaves.sol";

contract GreenTrust is GreenTrustFarmer, GreenTrustVerifier {
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
        bool isValid;
    }
    mapping(uint256 => Challenge) internal challenges;
    uint256 internal numChallenges;
    event challengeAdded(
        uint256 id,
        uint256 challenged,
        ChallengeStatus status,
        address challenger
    );
    event challengeAccepted(
        uint256 challengeId,
        uint256 challenged,
        ChallengeStatus status,
        address challenger
    );

    // Open to all Functions

    function registerVerifier(
        string memory _name,
        string memory _currentAddress,
        string memory _idCards
    ) public {
        require(addressToFarmerIds[msg.sender] == 0, "F1");
        require(addressToVerifierIds[msg.sender] == 0, "V1");
        verifiers[numVerifiers + 1].id = numVerifiers + 1;
        verifiers[numVerifiers + 1].walletAddress = payable(msg.sender);
        verifiers[numVerifiers + 1].name = _name;
        verifiers[numVerifiers + 1].currentAddress = _currentAddress;
        verifiers[numVerifiers + 1].idCards = _idCards;
        verifiers[numVerifiers + 1].isValid = true;
        addressToVerifierIds[msg.sender] = numVerifiers + 1;
        numVerifiers++;
        emit verifierRegistered(msg.sender, _name, numVerifiers);
    }

    function registerFarmer(string memory _profile, string memory _idCards)
        public
    {
        require(addressToFarmerIds[msg.sender] == 0, "F1");
        require(addressToVerifierIds[msg.sender] == 0, "V1");
        farmers[numFarmers + 1].id = numFarmers + 1;
        farmers[numFarmers + 1].walletAddress = payable(msg.sender);
        farmers[numFarmers + 1].profile = _profile;
        farmers[numFarmers + 1].idCards = _idCards;
        farmers[numFarmers + 1].isValid = true;
        addressToFarmerIds[msg.sender] = numFarmers + 1;
        numFarmers++;
        emit farmerRegistered(msg.sender, numFarmers);
    }

    // Common Functions

    function fetchUserType() public view returns (string memory) {
        require(
            addressToFarmerIds[msg.sender] != 0 ||
                addressToVerifierIds[msg.sender] != 0,
            "U0"
        );
        if (addressToFarmerIds[msg.sender] != 0) {
            return "farmer";
        } else if (addressToVerifierIds[msg.sender] != 0) {
            return "verifier";
        }
        return "consumer";
    }

    function AddChallenge(uint256 _challenged, ChallengeStatus _status) public {
        require(
            addressToFarmerIds[msg.sender] != 0 ||
                addressToVerifierIds[msg.sender] != 0,
            "U0"
        );
        require(crops[_challenged].isValid, "Cr0");
        challenges[numChallenges + 1].id = numChallenges + 1;
        challenges[numChallenges + 1].challenger = payable(msg.sender);
        challenges[numChallenges + 1].challenged = _challenged;
        challenges[numChallenges + 1].status = _status;
        challenges[numChallenges + 1].isValid = true;
        numChallenges + 1;
        emit challengeAdded(numChallenges, _challenged, _status, msg.sender);
    }

    function AddStake(uint256 _cropId) public {
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
        stakes[numStakes + 1].id = numStakes + 1;
        stakes[numStakes + 1].cropId = _cropId;
        stakes[numStakes + 1].stakeholder = payable(msg.sender);
        stakes[numStakes + 1].status = defaultStakeStatus;
        stakes[numStakes + 1].isValid = true;
        numStakes++;
        emit stakeAdded(numStakes, _cropId, msg.sender);
    }

    function AcceptChallenge(uint256 _challengeId) public {
        require(addressToVerifierIds[msg.sender] != 0, "U0V");
        require(challenges[_challengeId].isValid, "Ch0");
        challenges[_challengeId].status = ChallengeStatus.ALLOTTED;
        challenges[_challengeId].verifierId = addressToVerifierIds[msg.sender];
        emit challengeAccepted(
            _challengeId,
            challenges[_challengeId].challenged,
            challenges[_challengeId].status,
            challenges[_challengeId].challenger
        );
    }

    function fetchChallengeDetails(uint256 _challengeId)
        public
        view
        returns (Challenge memory)
    {
        require(
            _challengeId > 0 &&
                _challengeId <= numChallenges &&
                challenges[_challengeId].isValid,
            "Ch0"
        );
        return challenges[_challengeId];
    }
}
