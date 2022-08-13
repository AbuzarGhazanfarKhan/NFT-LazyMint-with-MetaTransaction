This File is Not USED in The Project But Is here just to show that THERE ARE OTHER WAYS TO CREATE SIGNATURES

// EIP 712:- Signs a specific content and interprate that in solidity so
// that evm can give understatnding of what has been signed and how do
//  we proceed with that signature and the data
import { ethers } from "ethers";
// let sig = document.getElementById("sig");
// let __id = document.getElementById("_id");
// let _ContractAdress = "0x64d4F033e6F0f74D2CFcCd0C3Ab3f9abbAe40bFA";
const SIGNING_DOMAIN_NAME = "TESTING"; // req by EIP 712
const SIGNING_DOMAIN_VERSION = "1"; // req by EIP 712

export class SignHelper {
  // Sig Constructor takes contractAddress chainId to stop spoofing and signers
  constructor(contractAddress, chainId, signer) {
    this.contractAddress = contractAddress;
    this.chainId = chainId;
    this.signer = signer;
  }

  async createSignature(id) {
    const obj = { id };
    const domain = await this._signingDomain();
    const types = {
      Web3Struct: [{ name: "id", type: "uint256" }],
    };

    // To get Signature & return a signature
    const signature = await this.signer._signTypedData(domain, types, obj);

    return { ...obj, signature };
  }
  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    const chainId = await this.chainId;
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    };
    return this._domain;
  }
  // tokenId so this signature cant be used again ever
static async getSign(contractAddress, chainId, tokenId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Signer: ",signer)
    await signer.getAddress();
    const lm = new SignHelper(contractAddress, chainId, signer);
    const voucher = await lm.createSignature(tokenId);
    return voucher;
  }
}

// export const Signature_create = async () => {
//   console.log(__id.value)
//   x = await SignHelper.getSign(`${_ContractAdress}`, 4, __id.value)
// }
