'use client';

import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export default function TestTonPage() {
  const [tonConnectUI] = useTonConnectUI();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addLog('Page loaded');
    if (tonConnectUI?.connected) {
      addLog('Wallet connected');
    } else {
      addLog('Wallet not connected');
    }
  }, [tonConnectUI?.connected]);

  useEffect(() => {
    if (tonConnectUI?.wallet) {
      addLog(`Wallet address: ${tonConnectUI.wallet.account.address}`);
    }
  }, [tonConnectUI?.wallet]);

  const connected = tonConnectUI?.connected;
  const walletAddress = tonConnectUI?.wallet?.account.address;
  const walletChain = tonConnectUI?.wallet?.account.chain;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          TON Connect Test Page
        </h1>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Connection Status</h2>
          <div className="space-y-2">
            <p className="text-white">
              <span className="font-semibold">Connected:</span> 
              <span className={`ml-2 px-2 py-1 rounded ${connected ? 'bg-green-500' : 'bg-red-500'}`}>
                {connected ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="text-white">
              <span className="font-semibold">Wallet:</span> 
              <span className="ml-2 font-mono text-sm">
                {walletAddress || 'None'}
              </span>
            </p>
            <p className="text-white">
              <span className="font-semibold">Chain:</span> 
              <span className="ml-2">
                {walletChain || 'None'}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">TON Connect Button</h2>
          <div className="flex justify-center">
            <TonConnectButton />
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Debug Logs</h2>
          <div className="bg-black/50 rounded-lg p-4 max-h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-green-400 text-sm font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
