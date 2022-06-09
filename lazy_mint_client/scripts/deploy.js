const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const NftMetaTransaction = await hre.ethers.getContractFactory("NftMetaTransaction");
  const metaTransactionNft = await NftMetaTransaction.deploy();

  await metaTransactionNft.deployed();

  console.log("NftMetaTransaction deployed to:", metaTransactionNft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
