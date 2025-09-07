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

declare module 'firebase/firestore' {
  export const getFirestore: any;
  export const doc: any;
  export const getDoc: any;
  export const setDoc: any;
  export const updateDoc: any;
  export const collection: any;
  export const query: any;
  export const orderBy: any;
  export const limit: any;
  export const getDocs: any;
  export const writeBatch: any;
  export const addDoc: any;
  export const serverTimestamp: any;
}

declare module 'firebase/auth' {
  export const getAuth: any;
  export const signInAnonymously: any;
  export const onAuthStateChanged: any;
  export type User = any;
}

declare module 'next/navigation' {
  export const useRouter: any;
  export const usePathname: any;
}

