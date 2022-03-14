import React from 'react';
import { useHistory } from 'react-router';

export function useShortcut(callback: () => void, keyCodes: string[], disableHotkey?: boolean): void {
  const history = useHistory();

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const searchParams = new URLSearchParams(history.location.search);
      if (keyCodes.includes(event.key.toLowerCase()) && !searchParams.get('modal')) {
        callback();
      }
    };
    if (!disableHotkey) {
      window.addEventListener('keydown', handler);
      return () => {
        window.removeEventListener('keydown', handler);
      };
    }
  }, [disableHotkey, keyCodes, history, callback]);
}
