"use client";

import { PropsWithChildren, useMemo } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export function TonProvider({ children }: PropsWithChildren) {
  const manifestUrl = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    return `${window.location.origin}/tonconnect-manifest.json`;
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>
  );
}

