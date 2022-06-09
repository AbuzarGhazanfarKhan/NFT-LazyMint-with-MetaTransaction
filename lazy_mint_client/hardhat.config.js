/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
const privateKey=process.env.PRIVATE_KEY
const rinkebyURL = process.env.RINKEBY_URL
const rinkebyAPI_KEY = process.env.RINKEBY_API_KEY
// console.log(privateKey)
// console.log(rinkebyURL)
 
 module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url:rinkebyURL,
      accounts:[privateKey],
      chainId:4
    }
   },
   etherscan: {
    apiKey: {
      rinkeby: rinkebyAPI_KEY
    }
  }
}
;
