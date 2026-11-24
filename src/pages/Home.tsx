import { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonThumbnail, IonLabel, IonButton, IonButtons, IonSearchbar,
} from "@ionic/react";
import { signOut } from "firebase/auth";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  TMDB_IMG_URL,
  FALLBACK_MOVIES,
  getPopularMovies,
  searchMovies,
  getMovieDetails,
} from "../tmdb";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async (query = "") => {
    let tmdbList: any[] = [];
    try {
      const data = query.trim()
        ? await searchMovies(query.trim())
        : await getPopularMovies(1);

      tmdbList = (data?.results || []).map((m: any) => ({
        id: "tmdb" + m.id,
        tmdbId: m.id,
        title: m.title,
        poster: m.poster_path ? `${TMDB_IMG_URL}${m.poster_path}` : "",
        year: (m.release_date || "").slice(0, 4),
        custom: false,
      }));
    } catch (e) {
      const q = query.toLowerCase().trim();
      tmdbList = q
        ? FALLBACK_MOVIES.filter((m) => m.title.toLowerCase().includes(q))
        : FALLBACK_MOVIES;
    }

    try {
      // Films ajoutés par l'administrateur
      const snap = await getDocs(collection(db, "movies"));
      const mine = snap.docs
        .map((d) => ({ id: d.id, ...d.data(), custom: true } as any))
        .filter((m) => !query || m.title?.toLowerCase().includes(query.toLowerCase()));
      setMovies([...mine, ...tmdbList]);
    } catch (e) {
      setMovies(tmdbList);
    }
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    loadMovies(val);
  };

  const addFavorite = async (m: any) => {
    if (!auth.currentUser) return;
    try {
      let fav: any;
      if (m.custom) {
        fav = {
          id: m.id,
          title: m.title,
          poster: m.poster || "",
          year: m.year,
          genres: m.genres || [],
          actors: m.actors || [],
        };
      } else {
        const d = await getMovieDetails(m.tmdbId);
        fav = {
          id: m.id,
          title: d.title || m.title,
          poster: d.poster_path ? `${TMDB_IMG_URL}${d.poster_path}` : m.poster || "",
          year: (d.release_date || m.year || "").slice(0, 4),
          genres: d.genres ? d.genres.map((g: any) => g.name) : [],
          actors: d.credits?.cast ? d.credits.cast.slice(0, 5).map((a: any) => a.name) : [],
        };
      }
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        favorites: arrayUnion(fav),
      });
      alert("Ajouté aux favoris !");
    } catch (e: any) {
      console.error("Erreur ajout favori:", e);
      alert("Erreur: " + (e.message || e));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Films</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => signOut(auth)}>Déconnexion</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
            placeholder="Rechercher un film..."
            debounce={400}
            onIonInput={(e) => handleSearch(e.detail.value ?? "")}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {movies.map((m) => (
            <IonItem key={m.id}>
              {m.poster && (
                <IonThumbnail slot="start">
                  <img src={m.poster} alt={m.title} />
                </IonThumbnail>
              )}
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
