'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export function TonConnectProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <TonConnectUIProvider 
      manifestUrl="/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/crypto_tycoon_bot'
      }}
      uiPreferences={{
        theme: 'DARK',
        borderRadius: 's'
      }}
    >
      {children}
    </TonConnectUIProvider>
  );
}
