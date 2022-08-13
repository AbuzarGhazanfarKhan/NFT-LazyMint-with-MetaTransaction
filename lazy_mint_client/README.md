# Minting And Creating Signature Fnctions
### For Creating Signature User have to only enter the name and the Voucher will be generated taht will be saved in database to be retreived later when a user decides to Mint a NFT for themselve

# Create Signature Function


 ``` Javascript
 
  async function createSignature() {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const contract=new ethers.Contract(contractAddress,abi,signer)
            try {
                const hash = await contract.getMessageHash(message)
                console.log(hash)
                const sig = await signer.signMessage(ethers.utils.arrayify(hash))
                console.log(sig)
                console.log(message)   
                postSigAndMessage(sig)
                setSignature(sig)
            }
            catch (error) {
                setError(error.message);
            }
      
        }
    }
    
   ``` 
   
   
      
 # Mint Function On Client That only takes NFT name in input
 
 
 ```Javascript
 
     async function mintHandle(msg, sig) {
        console.log(msg ,sig)
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const addressTo=signer.getAddress()
            const contract=new ethers.Contract(contractAddress,abi,signer)
            try {
                const response = await contract.safeMint(addressTo, msg, sig)
                console.log("response: ", response)
                setError(`NFT with name : ${msg} Minted Successfully`)
                afterExecute()
            } catch (error) {
                setError(error.message);
            }
      
        }
    } 
    
   ```
 
