import React, { useState } from "react";
import Web3 from "web3";
import ErrorMessage from "../utils/ErrorMessage.js";
import TxList from "../utils/TxList.js";
import erc20ABI from "../Contracts/ABI.json"; // Make sure this is the correct ABI
import { checkBalance } from "./TokenBalance.jsx";

const web3 = new Web3(window.ethereum);
const userContractAddress = "0xFEFC83C6741E81Fc2Ad52A9CE77360E3F4f23397";

const startPayment = async ({ setError, setTxs, tokenAmount, addr }) => {
  try {
    setError("");
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");

    const accounts = await web3.eth.getAccounts();
    const senderAddress = accounts[0];
    const recipientAddress = web3.utils.toChecksumAddress(addr);
    const contract = new web3.eth.Contract(
      erc20ABI,
      "0xb3D038fB4B08D33aBB3E0B78CAE92C6F4658AFcC"
    );

    const amountWei = web3.utils.toWei(tokenAmount, "ether");

    // Fetching the current gas price from the network
    const gasPrice = await web3.eth.getGasPrice();

    const tx = await contract.methods
      .transfer(recipientAddress, amountWei.toString())
      .send({
        from: senderAddress,
        gasPrice, // Use the gas price recommended by the network
        gasLimit: 100000,
      });

    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

// const startPayment = async ({ setError, setTxs, tokenAmount, addr }) => {
//   try {
//     setError("");
//     if (!window.ethereum)
//       throw new Error("No crypto wallet found. Please install it.");

//     await window.ethereum.send("eth_requestAccounts");

//     const accounts = await web3.eth.getAccounts();
//     const senderAddress = accounts[0];
//     const recipientAddress = web3.utils.toChecksumAddress(addr);
//     const contract = new web3.eth.Contract(
//       erc20ABI,
//       "0xb3D038fB4B08D33aBB3E0B78CAE92C6F4658AFcC"
//     );

//     const amountWei = web3.utils.toWei(tokenAmount, "ether");

//     const tx = await contract.methods
//       .transfer(recipientAddress, amountWei.toString())
//       .send({
//         from: senderAddress,
//         gasPrice: 250000000000,
//         gasLimit: 30000,
//       });

//     setTxs([tx]);
//   } catch (err) {
//     setError(err.message);
//   }
// };

const TokenTransfer = () => {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [ethBalance, setEthBalance] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const tokenAmount = data.get("tokenAmount");
    const addr = data.get("addr");

    // Check if transfer token amount is greater than the available balance
    await checkBalance({
      setError,
      setEthBalance,
      addr: userContractAddress,
    });

    if (ethBalance) {
      if (
        !tokenAmount ||
        isNaN(parseFloat(tokenAmount)) ||
        parseFloat(tokenAmount) <= 0 ||
        !(tokenAmount < ethBalance)
      ) {
        setError("Insufficient amount to send");
        return;
      }
    }

    if (!addr || !web3.utils.isAddress(addr)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    await startPayment({
      setError,
      setTxs,
      tokenAmount,
      addr,
      setEthBalance,
      ethBalance,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        Transfer ERC20 Tokens (Web3.js)
      </h1>
      <div className="bg-zinc-200 shadow-md rounded-3xl px-8 pt-12 pb-8 mb-4">
        <div className="mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-4"
                htmlFor="recipientAddress"
              >
                Recipient's Ethereum Address
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="recipientAddress"
                type="text"
                name="addr"
                placeholder="Enter Ethereum address"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-4"
                htmlFor="tokenAmount"
              >
                Token Amount
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenAmount"
                name="tokenAmount"
                type="text"
                placeholder="Enter token amount"
                required
              />
            </div>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Transfer
            </button>
          </form>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </div>
      </div>
    </div>
  );
};

export default TokenTransfer;
