// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract NftMetaTransaction is ERC721,Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(string=>bool) public redeemedToken;

    constructor() ERC721("LazyMintToken","LMT") {}

    function safeMint(address to, string memory message, bytes memory signature) public {
        //Check with id and signature  That who was the signer
        // If the signer is Also the owner of the contract then we can proceed
        require(verify(message,signature) == true,"Voucher Invalid");
        require(redeemedToken[message] != true ,"Token already redeemed");
        _tokenIdCounter.increment();
        uint256 tokenId=_tokenIdCounter.current();
        _safeMint(to,tokenId);
        redeemedToken[message]=true;
        
    }



    function verify(string memory message ,bytes memory signature) public view returns(bool){
            bytes32 _messageHash = getMessageHash(message);
            bytes32 ethSignedMessageHash = getEthSignedMessageHash(_messageHash);
           return recover(ethSignedMessageHash, signature) == owner();

    }

    function getMessageHash(string memory _message) public pure returns(bytes32){

        return keccak256(abi.encodePacked(_message));
    }
    function getEthSignedMessageHash(bytes32  _messageHash) public pure returns(bytes32){

        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",_messageHash));
    }
    function recover(bytes32 _ethSignedMessageHash, bytes memory signature) public pure returns(address){
    //    r and s are the cryptographic parameters used for digital signature
        (bytes32 r,bytes32 s, uint8 v) = _split(signature);
        
        //gives address of the signer
       return ecrecover(_ethSignedMessageHash,v,r,s);
    }

    function _split(bytes memory signature) internal pure returns(bytes32 r,bytes32 s, uint8 v){

        require(signature.length == 65,"Invalid Signature length");


        // for accessing the real signature stored in memory 
        assembly{
            // skips the first 32 bytes because it holds length of array
            r:= mload(add(signature ,32))
            //  and skips the next 32 because it holds the value of r hence 32+32=64
            s:= mload(add(signature ,64))
        //  and skips the next 32 because it holds the value of s hence 32+32+32=96
            // get the first byte from the 32 bytes after 96th
            v:=byte(0,mload(add(signature ,96)))
        }

    }


}