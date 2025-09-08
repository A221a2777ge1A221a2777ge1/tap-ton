interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

interface TelegramWebApp {
  initDataUnsafe?: {
    user?: TelegramWebAppUser;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export function getTelegramUser() {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    if (user) {
      return {
        tgId: user.id,
        first_name: user.first_name,
        username: user.username,
      };
    }
  }
  return null;
}
