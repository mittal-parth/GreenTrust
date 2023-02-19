// SPDX-License-Identifier: MIT
pragma solidity >=0.8.13 <0.9.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract GreenLeaves is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    address public EPNS_COMM_ADDRESS = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;
    address public CONTRACT_ADDRESS = 0xB7E99669e9eDdD2975511FBF059d01969f43D409;

    bytes public data;
    string public image_url;

    bytes32 private jobId;
    uint256 private fee;


    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "7da2702f37fd48e5b1b9a5715e3509b6";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    function requestBytes(string memory lat) public {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillBytes.selector
        );
        string memory api = "http://api.positionstack.com/v1/reverse?access_key=39f7471e54c6a460b752d4d670b7392f&query=";

        api = string(
        bytes.concat(
            bytes(api),
            bytes(lat))
        );

        req.add("get", "http://api.positionstack.com/v1/reverse?access_key=39f7471e54c6a460b752d4d670b7392f&query=40.7638435,-73.9729691");

        req.add("path", "data,0,label");
        sendChainlinkRequest(req, fee);
    }

    event RequestFulfilled(bytes32 indexed requestId, bytes indexed data);

    /**
     * @notice Fulfillment function for variable bytes
     * @dev This is called by the oracle. recordChainlinkFulfillment must be used.
     */
    function fulfillBytes(
        bytes32 requestId,
        bytes memory bytesData
    ) public recordChainlinkFulfillment(requestId) {
        emit RequestFulfilled(requestId, bytesData);
        data = bytesData;
        image_url = string(data);
    }

    // using Chainlink for Chainlink.Request;
 
    // string public volume;
    // bytes32 private jobId;
    // uint256 private fee;
 
    // event Request(bytes32 indexed requestId, string volume);
    // constructor() ConfirmedOwner(msg.sender) {
        
    //     jobId = "7d80a6386ef543a3abb52817f6707e3b";
    //     fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    // }

    // function requestApi(string memory lat) public returns (bytes32 requestId) {
    // Chainlink.Request memory req = buildChainlinkRequest(
    //     jobId,
    //     address(this),
    //     this.fulfill.selector
    // );
    //     string memory api = "http://api.positionstack.com/v1/reverse?access_key=39f7471e54c6a460b752d4d670b7392f&query=";
    //     // api = string.concat(api,lat);
    //     api = string(
    //     bytes.concat(
    //         bytes(api),
    //         bytes(lat)
    //     )
    // );
 
    //     // Set the URL to perform the GET request on
    //     req.add(
    //         "get",
    //         api
    //     );
 
 
    //     req.add("path", "data,0,label"); // Chainlink nodes 1.0.0 and later support this format
 
    //     return sendChainlinkRequest(req, fee);
    // }

    
   

    function sendNotification(string memory title, string memory body) public {


    IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
        CONTRACT_ADDRESS, // from channel
        address(this), // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
        bytes(
            string(
                // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                abi.encodePacked(
                    "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                    "+", // segregator
                    "1", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                    "+", // segregator
                    title, // this is notificaiton title
                    "+", // segregator
                    body
                )
            )
        )
    );
}


 
}
    