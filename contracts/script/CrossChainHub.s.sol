// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {CrossHubReceiver} from "../src/cross-chain-hub/CrossHubReceiver.sol";
import {CrossHubSender} from "../src/cross-chain-hub/CrossHubSender.sol";

contract DeployReceiver is Script, Helper {
    function run(SupportedNetworks destination) external {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);

        (address router, address link, , ) = getConfigFromNetwork(destination);

        CrossHubReceiver crossHubReceiver = new CrossHubReceiver(router, link);

        console.log(
            "crossHubReceiver deployed on ",
            networks[destination],
            "with address: ",
            address(crossHubReceiver)
        );
        vm.stopBroadcast();
    }
}

contract DeploySender is Script, Helper {
    function run(SupportedNetworks source) external {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);

        (address router, address link, , ) = getConfigFromNetwork(source);

        CrossHubSender crossHubSender = new CrossHubSender(router, link);

        console.log(
            "SourceMinter deployed on ",
            networks[source],
            "with address: ",
            address(crossHubSender)
        );

        vm.stopBroadcast();
    }
}

contract SendMessage is Script, Helper {
    function run(
        address payable sender,
        SupportedNetworks destination,
        address receiver,
        bytes memory functionPayload,
        CrossHubSender.PayFeesIn payFeesIn
    ) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        (, , , uint64 destinationChainId) = getConfigFromNetwork(destination);

        bytes32 messageId = CrossHubSender(sender).crossChainCall(
            destinationChainId,
            receiver,
            functionPayload,
            payFeesIn
        );

        console.log(
            "You can now monitor the status of your Chainlink CCIP Message via https://ccip.chain.link using CCIP Message ID: "
        );
        console.logBytes32(messageId);

        vm.stopBroadcast();
    }
}
