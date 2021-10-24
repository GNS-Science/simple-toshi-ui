import React from 'react';
import { useHistory } from 'react-router';

export function useShortcut(callback: () => void, keyCodes: string[]): void {
  const history = useHistory();
  const handler = (event: KeyboardEvent) => {
    const searchParams = new URLSearchParams(history.location.search);
    if (keyCodes.includes(event.key.toLowerCase()) && !searchParams.get('modal')) {
      callback();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [callback]);
}
