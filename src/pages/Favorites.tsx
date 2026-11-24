import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonThumbnail, IonLabel, IonButton, useIonViewWillEnter,
} from "@ionic/react";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const load = async () => {
    if (!auth.currentUser) return;
    const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (snap.exists()) {
      const data = snap.data();
      setFavorites(data.favorites || []);
    }
  };

  useIonViewWillEnter(() => {
    load();
  });

  const removeFavorite = async (movie: any) => {
    if (!auth.currentUser) return;
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        favorites: arrayRemove(movie),
      });
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
    } catch (e) {
      console.error("Erreur suppression favori:", e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ma Playlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {favorites.length === 0 && (
            <IonItem>
              <IonLabel className="ion-text-wrap">
                Votre playlist est vide. Ajoutez des films depuis l'onglet Films !
              </IonLabel>
            </IonItem>
          )}
          {favorites.map((m) => (
            <IonItem key={m.id}>
              {m.poster && (
                <IonThumbnail slot="start">
                  <img src={m.poster} alt={m.title} />
                </IonThumbnail>
              )}
              <IonLabel>
                <h2>{m.title}</h2>
                <p>{m.year}{m.genres && m.genres.length > 0 ? ` • ${m.genres.join(", ")}` : ""}</p>
                {m.actors && m.actors.length > 0 && (
                  <p>Acteurs: {m.actors.join(", ")}</p>
                )}
              </IonLabel>
              <IonButton
                slot="end"
                color="danger"
                fill="clear"
                onClick={() => removeFavorite(m)}
              >
                ✕
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
