import { AuthProvider } from "./lib";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Session, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { PrivateRoute } from "./components";
import { useAuth } from "./hooks";

// const authProvider = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// ).auth

// const authProvider = supabase.auth;

setupIonicReact();

const App: React.FC = () => {
  // const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   authProvider.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = authProvider.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // useEffect(() => {
  //   console.log("session", session);
  // }, [session]);

  // return (
  //   <IonApp>
  //     <IonReactRouter>
  //       <IonRouterOutlet>
  //         <PrivateRoute
  //           exact
  //           path="/home"
  //           component={() => (
  //             <IonButton onClick={() => supabase.auth.signOut()}>
  //               Logout
  //             </IonButton>
  //           )}
  //           session={session}
  //         />
  //         <Route exact path="/login">
  //           {session && <Redirect to="/home" />}
  //           <Auth
  //             supabaseClient={supabase}
  //             providers={["google"]}
  //             onlyThirdPartyProviders
  //             appearance={{ theme: ThemeSupa }}
  //           />
  //         </Route>
  //         <Route render={() => <Redirect to="/home" />} />
  //       </IonRouterOutlet>
  //     </IonReactRouter>
  //   </IonApp>
  // );

  return (
    <AuthProvider>
      <IonApp>
        <Home />
      </IonApp>
    </AuthProvider>
  );
};

export default App;
