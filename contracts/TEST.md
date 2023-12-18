
1. CrossHubSender
##### Hash: 0x6fb851251d525fe3944efc06b32533f975f4008d5d3044fb87d94f3a78d32499
##### Contract Address: 0x923aac3feA9e32F7823d09b138120B2eDcd92BAF

Deploy the [`CrossHubSender.sol`](./src/cross-chain-hub/CrossHubSender.sol) smart contract on the **source blockchain**, using the `script/CrossChainHub.s.sol:DeploySender` smart contract:

```solidity
function run(SupportedNetworks source) external;
```

For example, if you want to send a simple cross-chain message from POLYGON_MUMBAI, run:

```shell
forge script ./script/CrossChainHub.s.sol:DeploySender -vvv --broadcast --rpc-url polygonMumbai --sig "run(uint8)" -- 4
```

2. CrossHubReceiver
##### Hash: 0xe2059610cdb9fffbdd63dc92ebddb6b6c05b8cc86bc66dc8382a0d0ffe1d084a
##### Contract Address: 0xdBe8618D149CfAF4569024968BF721550748A292

Deploy the [`CrossHubReceiver.sol`](./src/cross-chain-hub/CrossHubReceiver.sol) smart contract to the **destination blockchain**. For this purpose, you can reuse the `script/CrossChainHub.s.sol:DeployReceiver` smart contract from the second example:

```solidity
function run(SupportedNetworks destination) external;
```

For example, to deploy it to Ethereum Sepolia, run:

```shell
forge script ./script/CrossChainHub.s.sol:DeployReceiver -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 0
```

3. Finally, send a cross-chain function payload using the `script/CrossChainHub.s.sol:SendMessage` smart contract:

```solidity
function run(
    address payable sender,
    SupportedNetworks destination,
    address receiver,
    string memory message,
    BasicMessageSender.PayFeesIn payFeesIn
) external;
```

```shell
forge script ./script/CrossChainHub.s.sol:SendMessage -vvv --broadcast --rpc-url polygonMumbai --sig "run(address,uint8,address,bytes,uint8)" -- <BASIC_MESSAGE_SENDER_ADDRESS> 0 <BASIC_MESSAGE_RECEIVER_ADDRESS> <FUNCTION_PAYLOAD> 0
```
4. Logic Contract 

##### Contract Address: 0xEeD1BC651b805ADDc860bE962316D0b28d296f39
##### Payload: 0x000000000000000000000000eed1bc651b805addc860be962316d0b28d296f390000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008424ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f21250000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
