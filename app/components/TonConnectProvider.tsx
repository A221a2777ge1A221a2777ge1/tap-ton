'use client';

import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export function TonConnectProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null on the server and during the initial client-side render
  if (!mounted) {
    return null;
  }

  const manifestUrl = `${window.location.origin}/tonconnect-manifest.json`;

  return (
    <TonConnectUIProvider 
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/crypto_tycoon_bot'
      }}
      uiPreferences={{
        theme: THEME.DARK,
        borderRadius: 's'
      }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: 'tonkeeper',
            name: 'Tonkeeper',
            imageUrl: 'https://tonkeeper.com/assets/tonconnect-icon.png',
            aboutUrl: 'https://chrome.google.com/webstore/detail/tonkeeper/fllfdcabdehclkalnpjlnmbomajkdfjh',
            universalLink: 'https://app.tonkeeper.com/ton-connect',
            jsBridgeKey: 'tonkeeper',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android']
          },
          {
            appName: 'mytonwallet',
            name: 'MyTonWallet',
            imageUrl: 'https://static.mytonwallet.io/tonconnect_logo.png',
            aboutUrl: 'https://chrome.google.com/webstore/detail/mytonwallet/fldfpgipfnagmlhbkccphjjlfminknme',
            universalLink: 'https://connect.mytonwallet.org',
            jsBridgeKey: 'mytonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android']
          }
        ]
      }}
    >
      {children}
    </TonConnectUIProvider>
  );
}
