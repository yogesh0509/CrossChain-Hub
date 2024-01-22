// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {VoterERC2771} from "../src/VoterERC2771.sol";

contract DeployContract is Script, Helper {
    function run(SupportedNetworks destination) external {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);

        VoterERC2771 voterERC2771 = new VoterERC2771();

        console.log(
            "crossHubReceiver deployed on ",
            networks[destination],
            "with address: ",
            address(voterERC2771)
        );
        vm.stopBroadcast();
    }
}

contract SendMessage is Script, Helper {
    function run(
        address addr,
        uint256 _candidateId, 
        string memory _name
    ) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        VoterERC2771(addr).addCandidate(
            _candidateId,
            _name
        );

        console.log(
            "Candidate Created!!"
        );
        vm.stopBroadcast();
    }
}