// import { useState  } from "react";


const TopBar = ({ accounts, setAccounts }) => {
    const isConnected=Boolean(accounts[0])
    // const [accounts, setAccounts] = useState([])

    async function connectAccount() {
        if (window.ethereum) {
            const accounts=await window.ethereum.request({method:"eth_requestAccounts"})
           setAccounts(accounts)
       }
   } 

    return (
        <>
            <center><h1 style={{background:"#B2FFFF",padding:"1em"}}> Account: {accounts} </h1>
            {isConnected ? (<div style={{background:"lightgreen"}}><h2>Connected</h2></div>) : (
                <button onClick={connectAccount} > Connect </button>
                )}
            </center>
            <hr />
            <br /><br />

    
      </>
  
    );
  }
  
  export default TopBar;