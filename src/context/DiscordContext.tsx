import { createContext, useContext, useState, ReactNode } from 'react';
import { DiscordUser, DiscordContext as DiscordContextType } from '../types/discord';

const DiscordContext = createContext<DiscordContextType | undefined>(undefined);

export function useDiscord() {
  const context = useContext(DiscordContext);
  if (context === undefined) {
    throw new Error('useDiscord must be used within a DiscordProvider');
  }
  return context;
}

export function DiscordProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(() => {
    const savedUser = localStorage.getItem('discord_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const unlockCharacter = async (characterName: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      unlockedCharacters: [...(user.unlockedCharacters || []), characterName]
    };

    setUser(updatedUser);
    localStorage.setItem('discord_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    setUser,
    unlockCharacter
  };

  return (
    <DiscordContext.Provider value={value}>
      {children}
    </DiscordContext.Provider>
  );
}