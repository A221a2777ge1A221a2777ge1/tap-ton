export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
    tgId?: number;
  }
  
  export function getTelegramUser(): TelegramUser | null {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;
      if (user) {
        return {
            ...user,
            tgId: user.id,
        };
      }      
    }
    return null;
  }

  declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initDataUnsafe: {
                    user?: TelegramUser;
                }
                ready: () => void;
                expand: () => void;
                close: () => void;
                // Add other properties and methods as needed
            }
        }
    }
  }