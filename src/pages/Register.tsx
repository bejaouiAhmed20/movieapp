import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonText, IonAvatar,
} from "@ionic/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Camera, CameraResultType } from "@capacitor/camera";
import { auth, db } from "../firebase";

const Register: React.FC = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const takePhoto = async () => {
    try {
      const img = await Camera.getPhoto({
        quality: 30,
        width: 300,
        resultType: CameraResultType.DataUrl,
      });
      setPhoto(img.dataUrl || "");
    } catch (e) {
      console.log("Photo annulée");
    }
  };

  const register = async () => {
    if (!nom || !prenom || !age || !photo) {
      setError("Veuillez remplir tous les champs et prendre une photo.");
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await setDoc(doc(db, "users", cred.user.uid), {
        nom: nom.trim(),
        prenom: prenom.trim(),
        age: Number(age),
        email: email.trim(),
        photo,
        role: "user",
        active: true,
        favorites: [],
      });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inscription</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput label="Nom" value={nom}
            onIonInput={(e) => setNom(e.detail.value ?? "")} />
        </IonItem>
        <IonItem>
          <IonInput label="Prénom" value={prenom}
            onIonInput={(e) => setPrenom(e.detail.value ?? "")} />
        </IonItem>
        <IonItem>
          <IonInput label="Âge" type="number" value={age}
            onIonInput={(e) => setAge(e.detail.value ?? "")} />
        </IonItem>
        <IonItem>
          <IonInput label="Email" type="email" value={email}
            onIonInput={(e) => setEmail(e.detail.value ?? "")} />
        </IonItem>
        <IonItem>
          <IonInput label="Mot de passe" type="password" value={password}
            onIonInput={(e) => setPassword(e.detail.value ?? "")} />
        </IonItem>

        {photo && (
          <IonAvatar style={{ width: 100, height: 100, margin: "16px auto" }}>
            <img src={photo} alt="Profil" />
          </IonAvatar>
        )}
        <IonButton expand="block" color="medium" onClick={takePhoto}>
          Prendre une photo (Caméra)
        </IonButton>

        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonButton expand="block" onClick={register}>S'inscrire</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Déjà un compte ? Se connecter
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
