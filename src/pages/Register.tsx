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
      console.log("Photo cancelled");
    }
  };

  const register = async () => {
    if (!nom || !prenom || !age || !photo) {
      setError("Please fill all fields and take a photo");
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        nom,
        prenom,
        age: Number(age),
        email,
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
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput label="Last name" value={nom}
            onIonInput={(e) => setNom(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonInput label="First name" value={prenom}
            onIonInput={(e) => setPrenom(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonInput label="Age" type="number" value={age}
            onIonInput={(e) => setAge(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonInput label="Email" type="email" value={email}
            onIonInput={(e) => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonInput label="Password" type="password" value={password}
            onIonInput={(e) => setPassword(e.detail.value!)} />
        </IonItem>

        {photo && (
          <IonAvatar style={{ width: 100, height: 100, margin: "16px auto" }}>
            <img src={photo} alt="me" />
          </IonAvatar>
        )}
        <IonButton expand="block" color="medium" onClick={takePhoto}>
          Take a photo
        </IonButton>

        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonButton expand="block" onClick={register}>Register</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Back to login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;