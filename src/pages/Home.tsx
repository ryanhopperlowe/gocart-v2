import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useAuth } from "../lib";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { authClient } from "../supabase";

const Home: React.FC = () => {
  const { session, login, logout, redirect } = useAuth();

  console.log("session", session);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {session ? <>Hello {session.user?.email}</> : <>Please login</>}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {session ? <>Hello {session.user?.email}</> : <>Please login</>}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer /> */}
        <div>
          {session ? (
            <IonButton color="danger" onClick={logout}>
              Logout
            </IonButton>
          ) : (
            // <IonButton color="success" onClick={login}>
            //   Login
            // </IonButton>
            <Auth
              supabaseClient={authClient}
              providers={["google"]}
              onlyThirdPartyProviders
              appearance={{ theme: ThemeSupa }}
              redirectTo={redirect}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
