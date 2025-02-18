'use client';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { user } = useAuth() || {};
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/');
  }, [user, router]);

  if (!user) return <p>Chargement...</p>;

  return (
    <h1>Zone protégée accessible uniquement aux utilisateurs connectés</h1>
  );
}
