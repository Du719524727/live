import React, { createContext, ReducerState, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { AuthenticationClient, Guard, initAuthClient, useAuthing, User } from '@authing/react-ui-components';
import { Routes, Route } from 'react-router-dom';

import '@authing/react-ui-components/lib/index.min.css';

const AUTHING_APP_ID = '62623163c097435e43888506';
initAuthClient({
  appId: AUTHING_APP_ID,
});

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const AuthingContext = createContext({
  user: undefined as undefined | null | User,
  role: undefined as undefined | string,
  authClient: null as AuthenticationClient | null,
  logout: (() => {}) as () => void,
});

export const AuthingContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authClient } = useAuthing();

  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!authClient) {
      console.warn('authClient not initialized');
      return;
    }

    authClient.checkLoginStatus().then(() => {
      authClient.getCurrentUser().then(async (user) => {
        setUser(user);
        if (user) {
          const isTeacher = await authClient.hasRole('teacher');
          setRole(isTeacher ? 'teacher' : 'student');
        }
      });
    });
  }, []);

  const logout = async () => {
    const yn = confirm('是否确认登出？');
    if (yn) {
      await authClient?.logout();
      localStorage.removeItem('CurrentSchoolId');
      localStorage.removeItem('CurrentClassId');
      location = window.location;
    }
  };

  const onLogin = async (user: User) => {
    if (user.token && authClient) {
      authClient?.setToken(user.token);
      const u = await authClient.getCurrentUser();
      setUser(u);
      const isTeacher = await authClient.hasRole('teacher');
      setRole(isTeacher ? 'teacher' : 'student');
    }
  };

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return (
      <div style={styles.container}>
        <Guard appId={AUTHING_APP_ID} onLogin={onLogin} />
      </div>
    );
  }

  return <AuthingContext.Provider value={{ user, role, authClient, logout }}>{children}</AuthingContext.Provider>;
};
