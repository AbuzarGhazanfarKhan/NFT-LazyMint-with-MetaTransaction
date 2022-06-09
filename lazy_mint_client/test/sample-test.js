const { expect } = require("chai");
// const { Signer } = require("ethers");
const { ethers } = require("hardhat");

describe("NftMetaTransaction", function () {
  it("should verify Signature", async function () {
    const accounts=await ethers.getSigners(2)
    const NftMetaTransaction = await hre.ethers.getContractFactory("NftMetaTransaction");
    const contract = await NftMetaTransaction.deploy();
    await contract.deployed();


    const signer=accounts[0]
    const message="Hello"
    const hash = await contract.getMessageHash(message)
    const signature=await signer.signMessage(ethers.utils.arrayify(hash))

    expect(await contract.verify(message,signature)).to.equal(true)
    // expect(await contract.verify(message,signature)).to.equal(true)

  });
});
