// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract GreenTrustVerifier {
    struct Verifier {
        uint256 id;
        address payable walletAddress;
        string name;
        string currentAddress;
        string idCards;
        bool isValid;
    }
    mapping(address => uint256) internal addressToVerifierIds;
    mapping(uint256 => Verifier) internal verifiers;
    uint256 numVerifiers;
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
        require(addressToVerifierIds[msg.sender] != 0, "V0");
        return verifiers[addressToVerifierIds[msg.sender]];
    }

    function updateVerifierProfile(
        string memory _name,
        string memory _currentAddress,
        string memory _idCards
    ) public {
        require(addressToVerifierIds[msg.sender] != 0, "V0");
        verifiers[addressToVerifierIds[msg.sender]].name = _name;
        verifiers[addressToVerifierIds[msg.sender]]
            .currentAddress = _currentAddress;
        verifiers[addressToVerifierIds[msg.sender]].idCards = _idCards;
        emit verifierUpdated(
            msg.sender,
            _name,
            addressToVerifierIds[msg.sender]
        );
    }

    function fetchVerifierDetails(uint256 _verifierId)
        public
        view
        returns (Verifier memory)
    {
        require(
            _verifierId > 0 &&
                _verifierId <= numVerifiers &&
                verifiers[_verifierId].isValid,
            "V0"
        );
        return verifiers[_verifierId];
    }
}
