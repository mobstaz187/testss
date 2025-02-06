import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDiscordUser } from '../lib/discord';
import { useAuth } from '../context/AuthContext';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      getDiscordUser(code)
        .then(user => {
          login({
            id: user.id,
            username: user.username,
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
          });
          navigate('/');
        })
        .catch(error => {
          console.error('Auth error:', error);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4" />
        <p className="text-white">Completing login...</p>
      </div>
    </div>
  );
};

export default AuthCallback;