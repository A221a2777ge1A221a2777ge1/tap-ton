'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

export function TonConnectProvider({ children }: { children: React.ReactNode }) {
  const manifestUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/tonconnect/manifest`
    : '/api/tonconnect/manifest';

  const twaReturnUrl = process.env.NEXT_PUBLIC_TWA_BOT_URL || 'https://t.me/crypto_tycoon_bot';

  return (
    <TonConnectUIProvider 
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl
      }}
      uiPreferences={{
        theme: 'DARK',
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
