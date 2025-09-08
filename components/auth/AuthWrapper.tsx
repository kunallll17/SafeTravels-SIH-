import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { SignUpScreen } from './SignUpScreen';

interface AuthWrapperProps {
  onAuthenticated: () => void;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ onAuthenticated }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    onAuthenticated();
  };

  const handleSignUp = () => {
    onAuthenticated();
  };

  const handleForgotPassword = () => {
    // Handle forgot password flow
    console.log('Forgot password flow');
  };

  if (authMode === 'signup') {
    return (
      <SignUpScreen
        onSignUp={handleSignUp}
        onLogin={() => setAuthMode('login')}
      />
    );
  }

  return (
    <LoginScreen
      onLogin={handleLogin}
      onSignUp={() => setAuthMode('signup')}
      onForgotPassword={handleForgotPassword}
    />
  );
};
