# Cross-Chain Hub

## 1. CrossHubSender

### Contract Details
- **Hash:** 0x6fb851251d525fe3944efc06b32533f975f4008d5d3044fb87d94f3a78d32499
- **Contract Address (Mumbai):** 0x923aac3feA9e32F7823d09b138120B2eDcd92BAF
- **Hash:** 0x6da632a533bad2c242ed0da16596551f287c7f086c8cfed44d3ae8cd116aa696
- **Contract Address (Sepolia):** 0x90F221148797B9344550C68f13F2A6dCA377133e

### Deployment
Deploy the `CrossHubSender.sol` smart contract on the source blockchain using the `script/CrossChainHub.s.sol:DeploySender` contract:

```solidity
function run(SupportedNetworks source) external;
```

For example, to deploy it to POLYGON_MUMBAI, run:

```shell
forge script ./script/CrossChainHub.s.sol:DeploySender -vvv --broadcast --rpc-url polygonMumbai --sig "run(uint8)" -- 4
```

## 2. CrossHubReceiver

### Contract Details
- **Hash:** 0xe2059610cdb9fffbdd63dc92ebddb6b6c05b8cc86bc66dc8382a0d0ffe1d084a
- **Contract Address (Sepolia):** 0xdBe8618D149CfAF4569024968BF721550748A292
- **Hash:** 0xa543c06c062e6a432196652b6eef1475bc3886ec5a8ce96955a2cdfe6443ab48
- **Contract Address (Mumbai):** 0xD4EF9304F8F1bFfaFD4d60fBd90c525b96BcFFA5
- **Hash:** 0xb5a5d9bbde285b65be1c753452636a80eb459efb6e15aae7fc5a04a5de061dd7
- **Contract Address (Arbitrum Testnet):** 0x1F09D7d259073414a81E5663C74a76182B05852D

### Deployment
Deploy the `CrossHubReceiver.sol` smart contract to the destination blockchain using the `script/CrossChainHub.s.sol:DeployReceiver` smart contract:

```solidity
function run(SupportedNetworks destination) external;
```

For example, to deploy it to Ethereum Sepolia, run:

```shell
forge script ./script/CrossChainHub.s.sol:DeployReceiver -vvv --broadcast --rpc-url ethereumSepolia --sig "run(uint8)" -- 0
```

## 3. CCIP Call
Finally, send a cross-chain function payload using the `script/CrossChainHub.s.sol:SendMessage` smart contract:

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
forge script ./script/CrossChainHub.s.sol:SendMessage -vvv --broadcast --rpc-url polygonMumbai --sig "run(address,uint8,address,bytes,uint8)" -- <BASIC_MESSAGE_SENDER_ADDRESS> <DESTINATION CHAIN> <BASIC_MESSAGE_RECEIVER_ADDRESS> <FUNCTION_PAYLOAD> 0
```
## 4. Logic Contract 

#### Contract Address: 0xEeD1BC651b805ADDc860bE962316D0b28d296f39
#### Payload: 0x000000000000000000000000eed1bc651b805addc860be962316d0b28d296f390000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008424ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f21250000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
