export interface TelegramUser {
  tgId: number;
  first_name: string;
  username?: string;
}

export function getTelegramUser(): TelegramUser | null {
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
