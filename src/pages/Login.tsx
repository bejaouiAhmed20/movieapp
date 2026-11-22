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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError("Wrong email or password");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput label="Email" type="email" value={email}
            onIonInput={(e) => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonInput label="Password" type="password" value={password}
            onIonInput={(e) => setPassword(e.detail.value!)} />
        </IonItem>
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonButton expand="block" onClick={login}>Login</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">
          Create an account
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;