import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signInWithDiscord } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      signInWithDiscord()
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Auth error:', error);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [searchParams, navigate, signInWithDiscord]);

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