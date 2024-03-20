import React, { useState } from "react";
import Web3 from "web3";
import ErrorMessage from "../utils/ErrorMessage.js";

export const checkBalance = async ({ setError, setEthBalance, addr }) => {
  console.log("addr", addr);
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    const web3 = new Web3(window.ethereum);
    const validAddress = web3.utils.isAddress(addr);
    if (!validAddress)
      throw new Error("Please enter a valid Ethereum address!");

    const balance = await web3.eth.getBalance(addr);
    const formattedBalance = web3.utils.fromWei(balance, "ether");
    setEthBalance(formattedBalance);
  } catch (err) {
    setError(err.message);
    setEthBalance(""); // Reset balance in case of error
  }
};

const TokenBalance = () => {
  const [addr, setAddr] = useState("");
  const [ethBalance, setEthBalance] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(); // Clear existing error
    await checkBalance({ setError, setEthBalance, addr });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
        ERC20 Token Balance
      </h1>
      <div className="bg-zinc-200 shadow-md rounded-3xl px-8 pt-12 pb-8 mb-4">
        <div className="mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-6"
                htmlFor="ethereumAddress"
              >
                Ethereum Address
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ethereumAddress"
                type="text"
                placeholder="Enter Ethereum address"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
              />
            </div>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {(ethBalance || error) && (
        <div className="bg-zinc-200 shadow-md rounded-xl  ">
          <p className="text-center text-lg p-4">
            {error && <ErrorMessage message={error} />}
          </p>
          {ethBalance && (
            <div className="balance-display w-full  my-4 bg-white py-4 ">
              <p className="flex justify-around">
                <span>Token Balance</span>
                <span> {ethBalance}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenBalance;
