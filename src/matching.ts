export const MIN_MATCH = 75; // Le taux de correspondance doit dépasser 75%

export interface FavoriteMovie {
  id?: string;
  title?: string;
  poster?: string;
  year?: string | number;
  genres?: string[];
  actors?: string[];
}

function jaccard(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Calcul du score de correspondance entre deux listes de favoris selon les spécifications:
 * 1. Films favoris (films en commun)
 * 2. Genre des films favoris
 * 3. Acteurs qui y jouent
 * 4. Année de sortie de ces films
 */
export function computeScore(favs1: FavoriteMovie[] = [], favs2: FavoriteMovie[] = []): number {
  if (!favs1 || !favs2 || favs1.length === 0 || favs2.length === 0) {
    return 0;
  }

  // 1. Films favoris (titres ou IDs partagés)
  const moviesA = new Set(
    favs1.map((m) => (m.id || m.title || "").toString().toLowerCase().trim()).filter(Boolean)
  );
  const moviesB = new Set(
    favs2.map((m) => (m.id || m.title || "").toString().toLowerCase().trim()).filter(Boolean)
  );
  const movieSim = jaccard(moviesA, moviesB);

  // 2. Genres des films favoris
  const genresA = new Set(
    favs1.flatMap((m) => m.genres || []).map((g) => g.toLowerCase().trim()).filter(Boolean)
  );
  const genresB = new Set(
    favs2.flatMap((m) => m.genres || []).map((g) => g.toLowerCase().trim()).filter(Boolean)
  );
  const hasGenres = genresA.size > 0 && genresB.size > 0;
  const genreSim = hasGenres ? jaccard(genresA, genresB) : 0;

  // 3. Acteurs qui y jouent
  const actorsA = new Set(
    favs1.flatMap((m) => m.actors || []).map((a) => a.toLowerCase().trim()).filter(Boolean)
  );
  const actorsB = new Set(
    favs2.flatMap((m) => m.actors || []).map((a) => a.toLowerCase().trim()).filter(Boolean)
  );
  const hasActors = actorsA.size > 0 && actorsB.size > 0;
  const actorSim = hasActors ? jaccard(actorsA, actorsB) : 0;

  // 4. Année de sortie de ces films (proximité temporelle)
  const yearsA = favs1
    .map((m) => parseInt(String(m.year).slice(0, 4), 10))
    .filter((y) => !isNaN(y) && y > 1900);
  const yearsB = favs2
    .map((m) => parseInt(String(m.year).slice(0, 4), 10))
    .filter((y) => !isNaN(y) && y > 1900);

  let yearSim = 0;
  const hasYears = yearsA.length > 0 && yearsB.length > 0;
  if (hasYears) {
    const avgYearA = yearsA.reduce((sum, y) => sum + y, 0) / yearsA.length;
    const avgYearB = yearsB.reduce((sum, y) => sum + y, 0) / yearsB.length;
    const diff = Math.abs(avgYearA - avgYearB);
    // 0 ans d'écart = 1.0; 20 ans d'écart = 0
    yearSim = Math.max(0, 1 - diff / 20);
  }

  // Pondération équilibrée selon les 4 critères
  const wMovies = 30;
  const wGenres = hasGenres ? 30 : 0;
  const wActors = hasActors ? 25 : 0;
  const wYears = hasYears ? 15 : 0;
  const totalWeight = wMovies + wGenres + wActors + wYears;

  if (totalWeight === 0) return 0;

  const score = (movieSim * wMovies + genreSim * wGenres + actorSim * wActors + yearSim * wYears) / totalWeight;
  return Math.round(score * 100);
}
