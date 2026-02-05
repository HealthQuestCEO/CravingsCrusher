import { useCallback, useRef } from 'react';
import type { PlayerProgress } from '../types/progress';
import { auth } from '../lib/firebase';
import { setItem, STORAGE_KEYS } from '../lib/storage';

export function useSync() {
  const syncingRef = useRef(false);

  const getToken = async (): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      return await user.getIdToken();
    } catch {
      return null;
    }
  };

  const saveToServer = useCallback(async (progress: PlayerProgress): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    try {
      const res = await fetch('/api/save-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ progress }),
      });
      if (res.ok) {
        setItem(STORAGE_KEYS.lastSyncTimestamp, new Date().toISOString());
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const loadFromServer = useCallback(async (): Promise<PlayerProgress | null> => {
    const token = await getToken();
    if (!token) return null;

    try {
      const res = await fetch('/api/load-progress', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const mergeAndSync = useCallback(async (localProgress: PlayerProgress): Promise<PlayerProgress> => {
    if (syncingRef.current) return localProgress;
    syncingRef.current = true;

    try {
      const token = await getToken();
      if (!token) return localProgress;

      const res = await fetch('/api/sync-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ progress: localProgress }),
      });

      if (res.ok) {
        const merged = await res.json();
        setItem(STORAGE_KEYS.lastSyncTimestamp, new Date().toISOString());
        return merged;
      }
      return localProgress;
    } catch {
      return localProgress;
    } finally {
      syncingRef.current = false;
    }
  }, []);

  return { saveToServer, loadFromServer, mergeAndSync };
}
