'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  useState,
  useCallback,
} from 'react';
import { investments as investmentOptions, type Investment } from '@/data/investments';
import { useTonWallet } from '@tonconnect/ui-react';
import { doc, onSnapshot, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define the User type
type User = {
  id: string;
  tonAddress: string;
  username?: string;
};

type AppState = {
  user: User | null;
  balance: number;
  investments: Record<string, number>; // id: level
  lastClaim: number;
  coinsPerTap: number;
};

type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> }
  | { type: 'UPDATE_BALANCE'; payload: number };

const initialState: AppState = {
  user: null,
  balance: 0,
  investments: {},
  lastClaim: Date.now(),
  coinsPerTap: 1,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  passiveIncomeRate: number;
  accruedIncome: number;
  buyInvestment: (investment: Investment) => Promise<boolean>;
  claimPassiveIncome: () => void;
} | null>(null);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_BALANCE':
        return { ...state, balance: action.payload, lastClaim: Date.now() };
    default:
      return state;
  }
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [accruedIncome, setAccruedIncome] = useState(0);
  const wallet = useTonWallet();

  useEffect(() => {
    if (wallet?.account?.address) {
      const tonAddress = wallet.account.address;
      const userRef = doc(db, 'users', tonAddress);

      const unsubscribe = onSnapshot(userRef, (userSnap) => {
        if (userSnap.exists()) {
          const userData = userSnap.data();
          dispatch({ type: 'LOAD_STATE', payload: userData as Partial<AppState> });
          dispatch({ type: 'SET_USER', payload: { id: userSnap.id, tonAddress, username: userData.username } });
        } else {
          const newUser: User = { id: tonAddress, tonAddress, username: 'New User' };
          const newGameState = { balance: 1000, investments: {}, lastClaim: Date.now(), coinsPerTap: 1 };
          setDoc(userRef, { ...newUser, ...newGameState });
        }
      });

      return () => unsubscribe();
    } else {
        dispatch({ type: 'SET_USER', payload: null })
    }
  }, [wallet]);

  const passiveIncomeRate = Object.entries(state.investments).reduce(
    (acc, [id, level]) => {
      const investment = investmentOptions.find((inv) => inv.id === id);
      if (investment) {
        acc += investment.income * level;
      }
      return acc;
    },
    0
  );

  useEffect(() => {
    const interval = setInterval(() => {
        if(state.user){
            const secondsSinceLastClaim = (Date.now() - state.lastClaim) / 1000;
            setAccruedIncome(passiveIncomeRate * secondsSinceLastClaim);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.lastClaim, passiveIncomeRate, state.user]);

  const claimPassiveIncome = useCallback(() => {
    if (state.user && accruedIncome > 0) {
        const newBalance = state.balance + accruedIncome;
        dispatch({ type: 'UPDATE_BALANCE', payload: newBalance });
        
        const userRef = doc(db, 'users', state.user.tonAddress);
        setDoc(userRef, { balance: newBalance, lastClaim: Date.now() }, { merge: true });

        setAccruedIncome(0);
    }
  }, [state.user, state.balance, accruedIncome]);

  const buyInvestment = useCallback(async (investment: Investment) => {
    if (!state.user) return false;

    const currentLevel = state.investments[investment.id] || 0;
    const cost = investment.price * Math.pow(1.15, currentLevel);
    
    if (state.balance >= cost) {
      const newBalance = state.balance - cost;
      const newInvestments = { ...state.investments, [investment.id]: currentLevel + 1 };

      const userRef = doc(db, 'users', state.user.tonAddress);
      await setDoc(userRef, { balance: newBalance, investments: newInvestments }, { merge: true });

      const transactionsRef = collection(db, 'users', state.user.tonAddress, 'transactions');
      await addDoc(transactionsRef, {
        type: 'investment',
        amount: -cost,
        item: investment.name,
        date: serverTimestamp(),
      });

      return true;
    }
    return false;
  }, [state.user, state.balance, state.investments]);

  return (
    <AppContext.Provider value={{ state, dispatch, passiveIncomeRate, accruedIncome, buyInvestment, claimPassiveIncome }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
