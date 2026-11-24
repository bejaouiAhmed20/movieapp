import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonInput, IonButton, IonLabel, IonListHeader, useIonViewWillEnter,
} from "@ionic/react";
import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Admin: React.FC = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState("");
  const [actors, setActors] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const loadUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map((d) => ({ uid: d.id, ...(d.data() as any) })));
  };

  useIonViewWillEnter(() => {
    loadUsers();
  });

  const addMovie = async () => {
    if (!title.trim()) return;
    await addDoc(collection(db, "movies"), {
      title: title.trim(),
      poster: poster.trim(),
      year: year.trim(),
      genres: genres.split(",").map((s) => s.trim()).filter(Boolean),
      actors: actors.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setTitle("");
    setPoster("");
    setYear("");
    setGenres("");
    setActors("");
    alert("Film ajouté à la base de départ !");
  };

  const toggleUser = async (u: any) => {
    await updateDoc(doc(db, "users", u.uid), { active: u.active === false });
    loadUsers();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Administration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Ajouter un film à la base</IonListHeader>
          <IonItem><IonInput label="Titre" value={title} onIonInput={(e) => setTitle(e.detail.value ?? "")} /></IonItem>
          <IonItem><IonInput label="URL de l'affiche" value={poster} onIonInput={(e) => setPoster(e.detail.value ?? "")} /></IonItem>
          <IonItem><IonInput label="Année" value={year} onIonInput={(e) => setYear(e.detail.value ?? "")} /></IonItem>
          <IonItem><IonInput label="Genres (séparés par virgule)" value={genres} onIonInput={(e) => setGenres(e.detail.value ?? "")} /></IonItem>
          <IonItem><IonInput label="Acteurs (séparés par virgule)" value={actors} onIonInput={(e) => setActors(e.detail.value ?? "")} /></IonItem>
          <IonButton expand="block" className="ion-margin" onClick={addMovie}>Ajouter le film</IonButton>

          <IonListHeader>Gestion des utilisateurs</IonListHeader>
          {users.map((u) => (
            <IonItem key={u.uid}>
              <IonLabel>
                <h2>{u.prenom} {u.nom}</h2>
                <p>{u.email} — {u.active === false ? "Désactivé" : "Actif"}</p>
              </IonLabel>
              <IonButton
                slot="end"
                color={u.active === false ? "success" : "danger"}
                onClick={() => toggleUser(u)}
              >
                {u.active === false ? "Activer" : "Désactiver"}
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
