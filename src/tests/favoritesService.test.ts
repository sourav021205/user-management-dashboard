import { getFavoriteIds, saveFavoriteIds } from "../services/favoritesService";

beforeEach(function () {
  localStorage.clear();
});

test("returns empty array when no favorites exist", function () {
  expect(getFavoriteIds()).toEqual([]);
});

test("returns saved favorite IDs", function () {
  localStorage.setItem("favoriteUserIds", JSON.stringify([1, 2, 3]));

  expect(getFavoriteIds()).toEqual([1, 2, 3]);
});

test("filters out invalid favorite IDs", function () {
  localStorage.setItem("favoriteUserIds", JSON.stringify([1, "two", 3, null]));

  expect(getFavoriteIds()).toEqual([1, 3]);
});

test("returns empty array when stored data is not an array", function () {
  localStorage.setItem("favoriteUserIds", JSON.stringify({ id: 1 }));

  expect(getFavoriteIds()).toEqual([]);
});

test("handles invalid JSON", function () {
  localStorage.setItem("favoriteUserIds", "invalid-json");

  expect(getFavoriteIds()).toEqual([]);
});

test("saves favorite IDs to localStorage", function () {
  saveFavoriteIds([1, 3, 5]);

  expect(JSON.parse(localStorage.getItem("favoriteUserIds") || "[]")).toEqual([
    1, 3, 5,
  ]);
});
