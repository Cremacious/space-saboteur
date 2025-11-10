'use client';
import React, { createContext } from 'react';
import { useSession } from '@/lib/auth-client';

// The context will hold the session data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SessionContext = createContext<any>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

// export function useSessionContext() {
//   return useContext(SessionContext);
// }
