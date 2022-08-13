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
            <center><h1 style={{backgroundColor:"#b1ade2",backgroundImage:"linear-gradient(315deg, #b1ade2 0%, #7ddff8 74%)",padding:"1em",width:"70%",boxShadow:"5px 5px 21px #b1ade2"}}> Account: {accounts} </h1>
            {isConnected ? (<div style={{backgroundColor:"#20bf55",backgroundImage:"linear-gradient(315deg, #20bf55 0%, #01baef 74%)",border: "solid 4px Darkgreen",width:"30%"}}><h2>Connected</h2></div>) : (
                <button onClick={connectAccount} > Connect </button>
                )}
            </center>
            <br />

    
      </>
  
    );
  }
  
export default TopBar;
  

// background-color: #4dccc6;
// background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
// background-color: #b1ade2;
// background-image: linear-gradient(315deg, #b1ade2 0%, #7ddff8 74%);
