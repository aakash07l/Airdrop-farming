import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Button } from "@/components/ui/button";

export default function AirdropDashboard() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);

  async function connectWallet() {
    try {
      const walletConnect = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
          137: "https://polygon-rpc.com",
          42161: "https://arb1.arbitrum.io/rpc",
        },
      });

      await walletConnect.enable();
      const ethersProvider = new ethers.providers.Web3Provider(walletConnect);
      const signer = ethersProvider.getSigner();

      const address = await signer.getAddress();
      const networkInfo = await ethersProvider.getNetwork();
      const userBalance = await ethersProvider.getBalance(address);

      setProvider(ethersProvider);
      setAccount(address);
      setNetwork(networkInfo);
      setBalance(ethers.utils.formatEther(userBalance));
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  }

  async function mintExampleToken() {
    if (!provider) return alert("Connect wallet first!");
    try {
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: account,
        value: ethers.utils.parseEther("0.0001"),
      });
      await tx.wait();
      alert("Dummy TX Sent for Airdrop Farming");
    } catch (error) {
      console.error("Transaction failed", error);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">🪂 Airdrop Farming Dashboard</h1>

        {!account ? (
          <Button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700">
            Connect Wallet
          </Button>
        ) : (
          <div className="space-y-4">
            <div>Wallet: {account}</div>
            <div>Network: {network?.name}</div>
            <div>Balance: {balance} ETH</div>

            <Button onClick={mintExampleToken} className="bg-green-600 hover:bg-green-700">
              Send Dummy TX (for Airdrop Eligibility)
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
