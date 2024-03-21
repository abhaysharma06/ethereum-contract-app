import React, { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "../utils/ErrorMessage";
import TxList from "../utils/TxList";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

const PaymentForm = ({ isEther }) => {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("tokenAmount"),
      addr: data.get("addr"),
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        Transfer ERC20 Tokens (ether.js)
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
          <TxList txs={txs} flag={true} />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
