"use client";

import { THEME } from "@tonconnect/ui-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const TonProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{
        theme: THEME.DARK,
        colorsSet: {
          [THEME.DARK]: {
            connectButton: {
              background: "#007AFF",
            },
          },
        },
      }}
      actionsConfiguration={{
        twaReturnUrl: `https://t.me/tap_ton_bot/tap`,
      }}
    >
      {children}
    </TonConnectUIProvider>
  );
};

export default TonProvider;
