import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonText,
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput label="Email" type="email" value={email}
            onIonInput={(e) => setEmail(e.detail.value ?? "")} />
        </IonItem>
        <IonItem>
          <IonInput label="Mot de passe" type="password" value={password}
            onIonInput={(e) => setPassword(e.detail.value ?? "")} />
        </IonItem>
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonButton expand="block" onClick={login}>Se connecter</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">
          Créer un compte
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
