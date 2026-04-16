import { useEffect, useState } from 'react';

export function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/membership/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setUser(data.user);
    }

    load();
  }, []);

  return user;
}
