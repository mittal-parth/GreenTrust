// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract GreenTrustVerifier {
    struct Verifier {
        uint256 id;
        address payable walletAddress;
        string name;
        string currentAddress;
        string[] idCards;
        bool isValid;
    }
    mapping(address => uint256) internal addressToVerifierIds;
    Verifier[] verifiers;
    event verifierRegistered(
        address indexed verifierAddress,
        string name,
        uint256 id
    );
    event verifierUpdated(
        address indexed verifierAddress,
        string name,
        uint256 id
    );

    // Functions for verifiers
    function fetchVerifierProfile() public view returns (Verifier memory) {
        require(
            addressToVerifierIds[msg.sender] != 0,
            "Verifier not registered with this wallet"
        );
        return verifiers[addressToVerifierIds[msg.sender] - 1];
    }

    function updateVerifierProfile(
        string memory _name,
        string memory _currentAddress,
        string[] memory _idCards
    ) public returns (Verifier memory) {
        require(
            addressToVerifierIds[msg.sender] != 0,
            "Verifier not registered with this wallet"
        );
        Verifier memory temp = Verifier(
            addressToVerifierIds[msg.sender],
            payable(msg.sender),
            _name,
            _currentAddress,
            _idCards,
            true
        );
        verifiers[addressToVerifierIds[msg.sender] - 1] = temp;
        emit verifierUpdated(
            msg.sender,
            _name,
            addressToVerifierIds[msg.sender]
        );
        return verifiers[addressToVerifierIds[msg.sender] - 1];
    }

    function fetchVerifierDetails(uint256 _verifierId)
        public
        view
        returns (Verifier memory)
    {
        require(
            _verifierId > 0 &&
                _verifierId <= verifiers.length &&
                verifiers[_verifierId].isValid,
            "Verifier does not exist"
        );
        return verifiers[_verifierId];
    }
}
