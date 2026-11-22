import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { film, heart, people, settings } from "ionicons/icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Matching from "./pages/Matching";
import Admin from "./pages/Admin";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      let currentUser: any = u;
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        const data = snap.data();
        if (data && data.active === false) {
          await signOut(auth);
          alert("Your account has been deactivated.");
          currentUser = null;
        } else {
          setRole(data?.role || "user");
        }
      }
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) return <IonApp />;

  return (
    <IonApp>
      <IonReactRouter>
        {user ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/matching" component={Matching} />
              <Route exact path="/admin" component={Admin} />
              <Route render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={film} />
                <IonLabel>Movies</IonLabel>
              </IonTabButton>
              <IonTabButton tab="favorites" href="/favorites">
                <IonIcon icon={heart} />
                <IonLabel>Favorites</IonLabel>
              </IonTabButton>
              <IonTabButton tab="matching" href="/matching">
                <IonIcon icon={people} />
                <IonLabel>Matching</IonLabel>
              </IonTabButton>
              {role === "admin" && (
                <IonTabButton tab="admin" href="/admin">
                  <IonIcon icon={settings} />
                  <IonLabel>Admin</IonLabel>
                </IonTabButton>
              )}
            </IonTabBar>
          </IonTabs>
        ) : (
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route render={() => <Redirect to="/login" />} />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;