// import { ethers } from "ethers"
// import { useState} from "react";
// import { contractAddress, abi } from "./constants/constants"
// import ErrorMessage from "./ErrorMessage";


// function ERC721_MetaTransaction() {
//     const [error, setError] = useState();
//     const [address, setAddress] = useState('')
//     const [token, setToken] = useState('')
//     const [signature, setSignature] = useState('')
//     const [addressTo, setAddressTo] = useState('')

//     async function getAccount() {
//        await window.ethereum.request({method:"eth_requestAccounts"})
//     }
//     async function Owner() {
//         if (window.ethereum !== "undefind") {
//             await getAccount()

//             const provider = new ethers.providers.Web3Provider(window.ethereum)
//             const contract = new ethers.Contract(contractAddress, abi, provider)
//             try {
//                 const data = await contract.owner()
//                 setAddress(data)
                
//             } catch (error) {
//                 setError(error)
//                 console.log(error)
//             }
//         }
//     }
//     async function Mint(e) {
//         e.preventDefault()
//         if (window.ethereum !== "undefind") {
//             await getAccount()

//             const provider = new ethers.providers.Web3Provider(window.ethereum)
//             const signer = provider.getSigner();
//             const contract = new ethers.Contract(contractAddress, abi, signer)

//             try {
//                 const data = await contract.safeMint({To:addressTo,id:parseInt(token),signature:signature})
//                 // setAddress(data)
//                 setError(data.message)
                
//             } catch (error) {
//                 setError(error)
//                 console.log(error)
//             }
//         }
//     }




//     return (
//         <>
//             {/* <button onClick={getAccount()}> Connect</button> */}
//            <p> Transfer Token To:- <input type="text" onChange={(e)=>{setAddressTo(e.target.value)}}  value={addressTo}/></p>
//            <p> Token Provided <input type="text" onChange={(e)=>{setToken(e.target.value)}}  value={token}/></p>
//            <p> Signature Provide <input type="text" onChange={(e)=>{setSignature(e.target.value)}}  value={signature}/></p>
//             <button id="MintToken" onClick={Mint}> Mint Token </button>
//             <ErrorMessage message={error} />
//            <br /> <button id="BalanceOf"> Balance Of </button>
//             <p> { address }</p>
//             <button id="Owner" onClick={Owner}> Owner of Contract</button>
            
        
//       </>
  
//     );
//   }
  
//   export default ERC721_MetaTransaction;