import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    signOut();
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg 
          hover:bg-black/50 transition-colors duration-300"
      >
        <img
          src={user.avatar_url}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white/90">{user.username}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg 
          shadow-xl border border-white/10 overflow-hidden z-50">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 
              transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;