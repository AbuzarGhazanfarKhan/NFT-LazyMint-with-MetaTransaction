import Axios from "axios"
import {  useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import {contractAddress,abi} from "./constants/constants"


function Minter({accounts, setAccounts}) {
    const [signature, setSignature] = useState('')
    const [message, setMessage] = useState('')
    const [dataResponse, setDataResponse] = useState({})
    const [error, setError] = useState();
    
    const handleChange =(e) => {
        const  { value } =  e.target
        setMessage(value)
}
    const handleSubmit = (e) => {
        e.preventDefault()             
}


    async function mintHandle(msg, sig) {
        console.log(msg , sig)
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
    
    async function createSignature() {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const contract=new ethers.Contract(contractAddress,abi,signer)
            try {
                const hash = await contract.getMessageHash(message)
                console.log(hash)
                const sig = await signer.signMessage(ethers.utils.arrayify(hash))
                // console.log(sig)
                // console.log(message)   
                postSigAndMessage(sig)
                setSignature(sig)
            }
            catch (error) {
                setError(error.message);
            }
      
        }
    }

    const postSigAndMessage = async (sig) => {
        console.log(sig)
       await Axios.post("http://127.0.0.1:8000/signature", {
           Signature:sig,Name:message
       }).then((response) => {
        //    console.log(response.data.error);
        //    console.log(response.data.response);
           if (response.data.error) {
               setError(response.data.error)
           }
           else if (response.data.response) {
            //    console.log(response.data.response)
            setError(response.data.response)
           }
      }, (error) => {
        setError(error.message);
       }
       );
    }
    const putNameAndSignature = async () => {
        await Axios.put("http://127.0.0.1:8000/signature", { Name: message })
            .then((response) => {
                console.log(response.data)
                console.log(response.data.response.error)
                // console.log(response.error)
                if (response.data.response.error) {
                    setError(response.data.response.error)
                }
                else{
                setDataResponse(response.data.response)
                let sig =  response.data.response.Signature
                let msg =  response.data.response.Name
                // console.log(msg)
                // console.log(sig)
                mintHandle(msg, sig)}
            
            }, (error) => {
                setError(error.message);
               })
        
    }
    const afterExecute = async () => {
        await Axios.put("http://127.0.0.1:8000/signature", { Name: message,Executed:true })
            .then((response) => {
                // console.log(response.success)

            
            })
    }
        
    



    return (
        <>
            <div>
                <center>
                    <div style={{backgroundColor:"#f6fba2",backgroundImage:"linear-gradient(315deg, #f6fba2 0%, #20ded3 74%)", border: "solid 2px red",width:"70%",boxShadow:"1px 3px 20px" }}> <h3>Notification:<ErrorMessage message={error}></ErrorMessage></h3></div>
                    <br />
       
                    <div style={{backgroundColor:"#b1ade2",backgroundImage:"linear-gradient(315deg, #b1ade2 0%, #7ddff8 74%)", border: "solid 2px Green",width:"70%",boxShadow:"1px 3px 20px",marginTop:"4px" }}>
                    <h1>Message Signature For Contract Owner</h1>
                    <form onSubmit={handleSubmit}>
                    <p>Message:  <input type="text" name="message" value={message} onChange={handleChange}/>{ message }</p>
                    <button onClick={createSignature}> Sign Message </button>
                    <p>Signature : {signature}</p>
                        </form>
                        </div>
                </center>
       
                <br />
                <center>
                <div style={{backgroundColor:"#b1ade2",backgroundImage:"linear-gradient(315deg, #b1ade2 0%, #7ddff8 74%)",border: "solid 2px purple",width:"70%",boxShadow:"1px 3px 20px",marginTop:"4px" }}>
                   
                    <h1>Mint NFT By Entering NFT Token name</h1>
                <p>Message:  <input type="text" name="message" value={message} onChange={handleChange}/>  { message }</p>
                    <button onClick={putNameAndSignature}>Mint NFT</button>
                    <h2>  Name of NFT: {dataResponse.Name} , Signature Redeemed: {dataResponse.Signature} </h2>
                  
                    </div>
                    </center>
            </div>
    
        </>
        
  
    );
  }
  
export default Minter;
// background-color: #f6fba2;
// background-image: linear-gradient(315deg, #f6fba2 0%, #20ded3 74%);