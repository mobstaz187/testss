import { ImportMetaEnv } from '../vite-env';

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
  unlockedCharacters?: string[];
}

export interface DiscordContextType {
  user: DiscordUser | null;
  setUser: (user: DiscordUser | null) => void;
  unlockCharacter: (characterName: string) => Promise<void>;
}