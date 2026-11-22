import { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonThumbnail, IonLabel, IonButton, IonButtons,
} from "@ionic/react";
import { signOut } from "firebase/auth";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db, TMDB_KEY } from "../firebase";

const API = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w200";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    // 1. Movies from TMDB
    const res = await fetch(`${API}/movie/popular?api_key=${TMDB_KEY}`);
    const data = await res.json();
    const tmdb = data.results.map((m: any) => ({
      id: "tmdb" + m.id,
      tmdbId: m.id,
      title: m.title,
      poster: m.poster_path ? IMG + m.poster_path : "",
      year: (m.release_date || "").slice(0, 4),
      custom: false,
    }));
    // 2. Movies added by the admin
    const snap = await getDocs(collection(db, "movies"));
    const mine = snap.docs.map((d) => ({ id: d.id, ...d.data(), custom: true }));
    setMovies([...mine, ...tmdb]);
  };

  const addFavorite = async (m: any) => {
    let fav: any;
    if (m.custom) {
      fav = {
        id: m.id, title: m.title, poster: m.poster, year: m.year,
        genres: m.genres, actors: m.actors,
      };
    } else {
      const res = await fetch(
        `${API}/movie/${m.tmdbId}?api_key=${TMDB_KEY}&append_to_response=credits`
      );
      const d = await res.json();
      fav = {
        id: m.id,
        title: d.title,
        poster: m.poster,
        year: (d.release_date || "").slice(0, 4),
        genres: d.genres.map((g: any) => g.name),
        actors: d.credits.cast.slice(0, 5).map((a: any) => a.name),
      };
    }
    await updateDoc(doc(db, "users", auth.currentUser!.uid), {
      favorites: arrayUnion(fav),
    });
    alert("Added to favorites!");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Movies</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => signOut(auth)}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {movies.map((m) => (
            <IonItem key={m.id}>
              <IonThumbnail slot="start">
                <img src={m.poster} alt={m.title} />
              </IonThumbnail>
              <IonLabel>
                <h2>{m.title}</h2>
                <p>{m.year}</p>
              </IonLabel>
              <IonButton slot="end" onClick={() => addFavorite(m)}>♥</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;