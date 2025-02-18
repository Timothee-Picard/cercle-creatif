'use client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Page() {
  const { user, loginWithEmail, loginWithOAuth, signUp, logout } =
    useAuth() || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => loginWithEmail?.(email, password);
  const handleSignup = () => signUp?.(email, password);

  if (user) {
    return (
      <div>
        <h1>Bienvenue, {user.email}</h1>
        <button onClick={logout}>Déconnexion</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Authentification</h1>
      <input
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Mot de passe'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>
        <button onClick={handleLogin}>Connexion</button>
      </p>
      <p>
        <button onClick={handleSignup}>Inscription</button>
      </p>
      <p>
        <button onClick={() => loginWithOAuth?.('google')}>
          Connexion avec Google
        </button>
      </p>
    </div>
  );
}
