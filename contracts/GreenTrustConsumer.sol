// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract GreenTrustConsumer {
    enum ChallengeStatus {
        OPEN,
        ALLOTTED,
        REJECTED,
        SUCCESSFUL
    }
    ChallengeStatus public constant defaultChallengeStatus =
        ChallengeStatus.OPEN;

    struct Consumer {
        uint256 id;
        address payable walletAddress;
        string name;
        bool isValid;
    }
    mapping(address => uint256) internal addressToConsumerIds;
    Consumer[] internal consumers;
    event consumerRegistered(
        address indexed consumerAddress,
        string name,
        uint256 id
    );
    event consumerUpdated(
        address indexed consumerAddress,
        string name,
        uint256 id
    );

    struct Challenge {
        uint256 id;
        uint256 verifierId;
        address payable challenger;
        uint256 challenged;
        ChallengeStatus status;
        bool isValid;
    }
    Challenge[] internal challenges;
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

    // Functions for consumers
    function fetchConsumerProfile() public view returns (Consumer memory) {
        require(
            addressToConsumerIds[msg.sender] != 0,
            "Consumer not registered with this wallet"
        );
        return consumers[addressToConsumerIds[msg.sender] - 1];
    }

    function updateConsumerProfile(string memory _name)
        public
        returns (Consumer memory)
    {
        require(
            addressToConsumerIds[msg.sender] != 0,
            "Consumer not registered with this wallet"
        );
        Consumer memory temp = Consumer(
            addressToConsumerIds[msg.sender],
            payable(msg.sender),
            _name,
            true
        );
        consumers[addressToConsumerIds[msg.sender] - 1] = temp;
        emit consumerUpdated(
            msg.sender,
            _name,
            addressToConsumerIds[msg.sender]
        );
        return consumers[addressToConsumerIds[msg.sender] - 1];
    }

    function fetchConsumerDetails(uint256 _consumerId)
        public
        view
        returns (Consumer memory)
    {
        require(
            _consumerId > 0 &&
                _consumerId <= consumers.length &&
                consumers[_consumerId].isValid,
            "Consumer does not exist"
        );
        return consumers[_consumerId];
    }

    function fetchChallengeDetails(uint256 _challengeId)
        public
        view
        returns (Challenge memory)
    {
        require(
            _challengeId > 0 &&
                _challengeId <= challenges.length &&
                challenges[_challengeId].isValid,
            "Challenge does not exist"
        );
        return challenges[_challengeId];
    }
}
