# Cross-Chain Hub

## 1. CrossHubSender

### Contract Details
- **Contract Address (Mumbai):** 0x923aac3feA9e32F7823d09b138120B2eDcd92BAF
- **Contract Address (Sepolia):** 0x90F221148797B9344550C68f13F2A6dCA377133e
- **Contract Address (Avalanche Fuji):** 0x1F09D7d259073414a81E5663C74a76182B05852D

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
- **Contract Address (Sepolia):** 0xdBe8618D149CfAF4569024968BF721550748A292
- **Contract Address (Mumbai):** 0xD4EF9304F8F1bFfaFD4d60fBd90c525b96BcFFA5
- **Contract Address (Avalanche Fuji):** 0x7FD625ba0a3b5E05d1a8E0FE697eA24E0feca20C

### Deployment
Deploy the `CrossHubReceiver.sol` smart contract to the destination blockchain using the `script/CrossChainHub.s.sol:DeployReceiver` smart contract:

```solidity
function run(SupportedNetworks destination) external;
```

For example, to deploy it to avalancheFuji, run:

```shell
forge script ./script/CrossChainHub.s.sol:DeployReceiver -vvv --broadcast --rpc-url avalancheFuji --sig "run(uint8)" -- 2
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
forge script ./script/CrossChainHub.s.sol:SendMessage -vvv --broadcast --rpc-url avalancheFuji --sig "run(address,uint8,address,bytes,uint8)" -- <BASIC_MESSAGE_SENDER_ADDRESS> 2 <BASIC_MESSAGE_RECEIVER_ADDRESS> <FUNCTION_PAYLOAD> 0
```
## 4. Logic Contract 

#### Contract Address (Sepolia): 0xEeD1BC651b805ADDc860bE962316D0b28d296f39
#### Contract Address (Mumbai): 0x424ebAA909F16433CC45e3Df74C5Debd59f5d480
#### Contract Address (avalancheFuji): 0xc8C23F4DcC2f3053C53862335970728D91154Df7