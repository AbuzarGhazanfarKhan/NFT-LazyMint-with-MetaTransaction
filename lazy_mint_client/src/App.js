import './App.css';
import TopBar from './TopBar';
import { useState } from "react";
import Minter from './Minter';

// import SignMessage from './SignMessage';
// import ERC721_MetaTransaction from './ERC721_MetaTransaction';

function App() {

  const [accounts, setAccounts] = useState([])
  // async function connectAccount() {
  //     if (window.ethereum) {
  //         const accounts=await window.ethereum.request({method:"eth_requestAccounts"})
  //        setAccounts(accounts)
  //    }
  return (
    <>
      <TopBar accounts={accounts} setAccounts={setAccounts} ></TopBar>
      <Minter accounts={accounts} setAccounts={setAccounts}></Minter>

    </>

  );
}

export default App;
