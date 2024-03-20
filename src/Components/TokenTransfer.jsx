import React, { useState } from "react";
import Web3 from "web3";
import ErrorMessage from "../utils/ErrorMessage.js";
import TxList from "../utils/TxList.js";
import erc20ABI from "../Contracts/ERC20ABI.json"; // Make sure this is the correct ABI
import { checkBalance } from "./TokenBalance.jsx";

const web3 = new Web3(window.ethereum);
const userContractAddress = "0x16286cB5C96851f23BDC6e316Ad1878D18c8bAC9";

const startPayment = async ({ setError, setTxs, tokenAmount, addr }) => {
  try {
    setError("");
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");

    const accounts = await web3.eth.getAccounts();
    const senderAddress = accounts[0];
    const recipientAddress = web3.utils.toChecksumAddress(addr);
    const contract = new web3.eth.Contract(erc20ABI, userContractAddress);

    const amountWei = web3.utils.toWei(tokenAmount, "ether");

    const tx = await contract.methods
      .transfer(recipientAddress, amountWei.toString())
      .send({
        from: senderAddress,
        gas: 200000, // Adjust gas limit as needed
        gasPrice: "10000000", // Adjust gas price as needed
      });

    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

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

    if (
      !tokenAmount ||
      isNaN(parseFloat(tokenAmount)) ||
      parseFloat(tokenAmount) <= 0 ||
      !(tokenAmount < ethBalance)
    ) {
      setError("Insufficient amount to send");
      return;
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
        Transfer ERC20 Tokens
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

// const TokenTransfer = () => {
//   const [error, setError] = useState();
//   const [txs, setTxs] = useState([]);
//   const [ethBalance, setEthBalance] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData(e.target);
//     setError();
//     await startPayment({
//       setError,
//       setTxs,
//       tokenAmount: data.get("tokenAmount"),
//       addr: data.get("addr"),
//       setEthBalance,
//       ethBalance,
//     });
//   };
//   console.log(txs);

//   console.log(error);

//   return (
//     <div className="max-w-2xl mx-auto mt-10 mb-10">
//       <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
//         Transfer ERC20 Tokens
//       </h1>
//       <div className="bg-zinc-200 shadow-md rounded-3xl px-8 pt-12 pb-8 mb-4">
//         <div className="mb-4">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-4"
//                 htmlFor="recipientAddress"
//               >
//                 Recipient's Ethereum Address
//               </label>
//               <input
//                 className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="recipientAddress"
//                 type="text"
//                 name="addr"
//                 placeholder="Enter Ethereum address"
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-4"
//                 htmlFor="tokenAmount"
//               >
//                 Token Amount
//               </label>
//               <input
//                 className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                 id="tokenAmount"
//                 name="tokenAmount"
//                 type="text"
//                 placeholder="Enter token amount"
//               />
//             </div>
//             <button
//               className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Transfer
//             </button>
//           </form>
//           <ErrorMessage message={error} />
//           <TxList txs={txs} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TokenTransfer;
