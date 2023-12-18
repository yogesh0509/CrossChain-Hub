// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract CrossHubReceiver is CCIPReceiver {

    event FunctionCallSuccessfull(address indexed);

    constructor(address router) CCIPReceiver(router) {}

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (address decodedAddress, bytes memory decodedData) = abi.decode(message.data, (address, bytes));
        (bool success, ) = decodedAddress.call(decodedData);
        require(success, "Contract call failed");
        emit FunctionCallSuccessfull(decodedAddress);
    }
}
