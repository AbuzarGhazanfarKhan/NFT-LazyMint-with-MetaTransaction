# NFT-LazyMint-with-MetaTransaction
## Code on Master Branch
### Here is the flow of the dapp:-
### 1) An address will be stored/authenticated in the database beforehand 
### 2) When user comes to the site to mint, we authenticate them by asking them to sign a message, and using verifyMessage (ethers.js) on the Backend we recover the
### public key of the user
### 3) If the user is authenticated in the db we return The voucher and the signature to the client
### 4) Then the signature can be redeemed 
### 5) The smart contract will again verify if the user is allowed or not
### 6) If the user is allowed the nft(erc721) is minted else error is thrown to the user
# Smart Contracts Used
## Smart Contract Address : 0x16680D97Ba0f00a71F88922a022631DFdDb9ADE2
### EIP712 to Sign And Recover Hash ANd Message
### OpenZeppelin NFT ERC-712
# FrontEnd:-
### React Js
# Backend To Store Signatures
### NodeJs And MongoDb as a Database 
