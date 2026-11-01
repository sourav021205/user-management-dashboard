const FAVORITES_KEY = "favoriteUserIds";

export function getFavoriteIds(): number[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);

    if (!saved) {
      return [];
    }

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(function (id): id is number {
      return typeof id === "number";
    });
  } catch {
    return [];
  }
}

export function saveFavoriteIds(ids: number[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}
