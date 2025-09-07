// Minimal ambient declarations to satisfy TypeScript in this workspace environment.
// These are fallbacks; real types come from installed packages at build/runtime.

declare module '@tonconnect/ui-react' {
  import type React from 'react';
  export const TonConnectUIProvider: React.FC<any>;
  export const TonConnectButton: React.FC<any>;
  export function useTonConnectUI(): any;
  export function useTonWallet(): any;
}

declare module 'next/server' {
  export const NextResponse: any;
}

declare module 'react' {
  const React: any;
  export default React;
  export type FC<P = any> = (props: P & { children?: any }) => any;
  export function useEffect(effect: (...args: any[]) => any, deps?: any[]): void;
  export function useState<S = any>(initialState?: S): [S, (value: S | ((prev: S) => S)) => void];
}

