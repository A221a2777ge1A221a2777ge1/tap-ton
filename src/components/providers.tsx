"use client";

import { AppContextProvider } from "@/contexts/AppContext";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import type { ReactNode } from "react";

const tonConnectUIWalletConnect = {
  manifestUrl:
    "https://tonup-t0iem.web.app/tonconnect-manifest.json",
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TonConnectUIProvider {...tonConnectUIWalletConnect}>
      <AppContextProvider>{children}</AppContextProvider>
    </TonConnectUIProvider>
  );
}