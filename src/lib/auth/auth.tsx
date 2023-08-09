import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../../supabase";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";

interface AuthContextProps {
  session: Session | null;
  login?: () => Promise<unknown>;
  logout?: () => Promise<unknown>;
  redirect?: string;
}

const AuthContext = createContext<AuthContextProps>({ session: null });

export const useAuth = () => useContext(AuthContext);

const appId = import.meta.env.VITE_APP_NAME;
const redirectUrl = `${appId}://login`;

const login = () =>
  authClient.auth.signInWithOAuth({
    provider: "google",
    options: Capacitor.isNativePlatform()
      ? {
          redirectTo: redirectUrl,
        }
      : {},
  });

const logout = () => authClient.auth.signOut();
const getSession = async () =>
  (await authClient.auth.getSession()).data.session;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  console.log("location", window.location);
  console.log("redirectUrl", redirectUrl);

  console.log(Capacitor.isNativePlatform());

  const refreshSession = () => getSession().then(setSession);

  useEffect(() => {
    refreshSession();

    const { data } = authClient.auth.onAuthStateChange((event, session) => {
      console.log(event);
      setSession(session);
    });

    App.addListener("appUrlOpen", (event) => {
      console.log("appUrlOpen", event);
      const openUrl = event.url;
      const access = openUrl.split("#access_token=").pop()?.split("&")[0] || "";
      const refresh =
        openUrl.split("&refresh_token=").pop()?.split("&")[0] || "";

      authClient.auth.setSession({
        access_token: access,
        refresh_token: refresh,
      });
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        redirect: Capacitor.isNativePlatform() ? redirectUrl : undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function convertUser(user: User) {
  return {
    id: user.id,
    email: user.email,
  };
}
