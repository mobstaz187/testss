import { ImportMetaEnv } from '../vite-env.ts';

const DISCORD_API = 'https://discord.com/api';

export async function getDiscordUser(code: string) {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

  try {
    const tokenResponse = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: 'POST',
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        scope: 'identify',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = await tokenResponse.json();

    const userResponse = await fetch(`${DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return userResponse.json();
  } catch (error) {
    console.error('Error getting Discord user:', error);
    throw error;
  }
}

export function redirectToDiscordAuth() {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify',
  });

  window.location.href = `${DISCORD_API}/oauth2/authorize?${params}`;
}