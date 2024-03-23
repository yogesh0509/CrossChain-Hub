// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {CCIPClientExample} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPClientExample.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

contract CrossHubReceiver is CCIPClientExample {
    event FunctionCallSuccessfull(address indexed decodedAddress, bytes32 indexed messageId);
    event FunctionCallFailed(address indexed decodedAddress, bytes32 indexed messageId, bytes indexed err);

    error OnlySelf();

    modifier onlySelf() {
        if (msg.sender != address(this)) revert OnlySelf();
        _;
    }

    // The message contents of failed messages are stored here.
    // mapping(bytes32 messageId => Client.Any2EVMMessage contents) public s_messageContents;

    constructor(address router, address feeToken) CCIPClientExample(IRouterClient(router), IERC20(feeToken)) {}

    /// @notice The entrypoint for the CCIP router to call. This function should never revert, all errors should be handled internally in this contract.
    /// @param message The message to process.
    /// @dev Extremely important to ensure only router calls this.
    function ccipReceive(
        Client.Any2EVMMessage memory message
    ) external virtual override onlyRouter {

        // decode the payload to contract address and function payload.
        (address decodedAddress, bytes memory decodedData) = abi.decode(message.data, (address, bytes));
        
        try this.processMessage(decodedAddress, decodedData) {} catch (bytes memory err) {
            // s_messageContents[message.messageId] = message;
            // Don't revert so CCIP doesn't revert. Emit event instead.
            emit FunctionCallFailed(decodedAddress, message.messageId, err);
            return;
        }
        emit FunctionCallSuccessfull(decodedAddress, message.messageId);
    }

    /// @notice This function the entrypoint for this contract to process messages.
    /// @param decodedAddress Logic contract address.
    /// @param decodedData Bytes data of the function to be called.
    /// @dev Calls our logic contract address with the help of function payload.
    /// @dev It has to be external because of the try/catch.
    function processMessage(
        address decodedAddress, bytes memory decodedData
    ) external onlySelf {
        (bool success, ) = decodedAddress.call(decodedData);
    }
}
