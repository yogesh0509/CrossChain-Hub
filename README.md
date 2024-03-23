# Introduction 

Blockchain technology has emerged as a transformative force, promising decentralized and secure transactions across applications. However, as the blockchain ecosystem continues to expand with various platforms and networks, a significant challenge has surfaced—interoperability. Interoperability refers to the ability of different blockchain networks to seamlessly communicate, share data, and transact with one another. This challenge stems from the lack of standardized protocols and the diversity in blockchain architectures, consensus mechanisms, and smart contract languages.

Our proposed solution centres around the development of a protocol that establishes secure and efficient communication channels between different blockchain networks. To augment this solution, we have introduced an API service that enables users to call smart contracts residing on different chains. This strategic integration streamlines cross-chain smart contract interaction, allowing us to seamlessly interact with diverse blockchain architectures. The protocol ensures both security and transparency, providing a foundation for interoperability in the blockchain ecosystem.

# Methodology

Our design is majorly divided into two parts –

1. API Architecture
2. Smart Contracts

There are two smart contracts that we create and deploy to send our payload cross-chain. Sender contract is used to send the payload from current chain and receiver contract is used to receive payload at destination chain.
The sender contract uses the following solidity structure `EVM2AnyMessage` which can be imported from the {Client} library provided by Chainlink to build CCIP messages. This message is built and sent on the function `crossChainCall () ` that is called by the Externally Owned Account (EOA). This function accepted three arguments as discussed above - (uint64 destinationChainSelector, address receiver, bytes memory functionPayload).

![](./api/constants/struct.png)

For our cross-chain message we only require the bytes receiver and bytes data. Bytes receiver is calculated using abi.encode(address receiver). Bytes data is the payload that is sent with the function call. Rest of the arguments are not required for our example. Once the message has been created, we calculate the fee required to be paid for this cross-chain transaction. This is done with the help of {IRouterClient} library that is again provided by chainlink.

```solidity
function getFee (uint64 destinationChainSelector, struct Client.EVM2AnyMessage message) external view returns (uint256 fee)
```

It takes two arguments destinationChainSelector and the message that we created in the previous step. Once the fee has been calculated which will be paid in native currency of the chain, we send the message by calling ` ccipSend () ` which is again provided by the {IRouterClient} library. It takes the same two arguments as the `getFee () ` function. Note: We can pay the gas fees in the form of LINK tokens by Chainlink.

To get API reference for these libraries, refer this [documentation](https://docs.chain.link/ccip/api-reference/i-router-client#overview) by Chainlink and the code for sender contract can be found on [GitHub](https://github.com/yogesh0509/CrossChain-Hub/blob/main/contracts/src/cross-chain-hub/CrossHubSender.sol).

Next, we will look into the receiver contract. It uses the function `_ccipReceive () ` which is called by the CCIP Router once the message i.e. payload has been received at the destination chain. To ensure secure transaction, we have used a modifier `onlyRouter` which ensures that only the router deployed on destination chain is able to call our receiver contract. The function takes one argument which is `EVM2AnyMessage message` that we sent from the sender contract. We use this message to call our logic contract function on-chain by first decoding the `message.data` which is the payload that we constructed initially into two parts - logic contract address and decoded data and then calling the decoded data from the decoded address. Here, decoded data is bytes encoded function ABI and its arguments.

```solidity
(address decodedAddress, bytes memory decodedData) = abi.decode(message.data, (address, bytes));
(bool success, ) = decodedAddress.call(decodedData);
```

This triggers the original function `myMethod () ` that the EOA wanted to execute but from a different chain hence completing our objective.

CCIP allows us to pay gas fees only on the source chain and takes care of the gas fees on the destination chain. This allows us to make interoperable calls. However, if call on logic contract reverts due to some reason may it be logical or a sudden surge in gas price, the destination transaction fails but the source transaction i.e. call by the EOA to our sender contract still succeeds which means we will not get back the gas fees already spent on calling the sender contract no matter the result on destination chain. When the logic contract reverts a transaction, instead of reverting it back from the receiver chain, we can emit an error event using a `try catch` block. This way we can also store the error messages using a `(bytes32 => bytes)` mapping which would map CCIP message ID to error message thus giving proper error feedback to the client as we cannot send back the error message from destination chain to source chain. The bytes error code can be later deconstructed client side to finally give the error message.