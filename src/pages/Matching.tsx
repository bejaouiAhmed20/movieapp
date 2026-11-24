import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonAvatar, IonLabel, IonBadge, useIonViewWillEnter,
} from "@ionic/react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { computeScore, MIN_MATCH } from "../matching";

const Matching: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);

  const load = async () => {
    const snap = await getDocs(collection(db, "users"));
    const all = snap.docs.map((d) => ({ uid: d.id, ...(d.data() as any) }));
    const me = all.find((u) => u.uid === auth.currentUser!.uid);
    if (!me) return;

    const result = all
      .filter((u) => u.uid !== me.uid && u.active !== false)
      .map((u) => ({ ...u, score: computeScore(me.favorites || [], u.favorites || []) }))
      .filter((u) => u.score >= MIN_MATCH)
      .sort((a, b) => b.score - a.score);

    setMatches(result);
  };

  useIonViewWillEnter(() => {
    load();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users like you</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {matches.length === 0 && (
            <IonItem><IonLabel>No match above {MIN_MATCH}% yet</IonLabel></IonItem>
          )}
          {matches.map((u) => (
            <IonItem key={u.uid}>
              <IonAvatar slot="start"><img src={u.photo} alt="" /></IonAvatar>
              <IonLabel>{u.prenom} {u.nom}</IonLabel>
              <IonBadge slot="end" color="success">{u.score}%</IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Matching;