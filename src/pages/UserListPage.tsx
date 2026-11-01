
import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import { getUsers } from "../api/usersApi";
import type { User } from "../types/user";

import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import SortControls from "../components/SortControls";
import Pagination from "../components/Pagination";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import useDebounce from "../hooks/useDebounce";

import { filterUsers } from "../utils/filterUsers";
import { sortUsers } from "../utils/sortUsers";
import type { SortField } from "../utils/sortUsers";
import { paginateUsers } from "../utils/paginateUsers";
import { exportCsv } from "../utils/exportCsv";

import {
  getFavoriteIds,
  saveFavoriteIds
} from "../services/favoritesService";

function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reloadCount, setReloadCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [favoriteIds, setFavoriteIds] =
    useState<number[]>(getFavoriteIds);

  const debouncedSearch = useDebounce(searchTerm, 400);

  const usersPerPage = 5;

  useEffect(function () {
    let active = true;

    getUsers()
      .then(function (data) {
        if (active) {
          setUsers(data);
          setError(null);
        }
      })
      .catch(function (err: unknown) {
        if (active) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Unable to load users");
          }
        }
      })
      .finally(function () {
        if (active) {
          setLoading(false);
        }
      });

    return function () {
      active = false;
    };
  }, [reloadCount]);

  useEffect(function () {
    saveFavoriteIds(favoriteIds);
  }, [favoriteIds]);

  const handleRetry = useCallback(function () {
    setLoading(true);
    setError(null);
    setReloadCount(function (count) {
      return count + 1;
    });
  }, []);

  const handleSearchChange = useCallback(function (value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleCityChange = useCallback(function (value: string) {
    setCityFilter(value);
    setCurrentPage(1);
  }, []);

  const handleCompanyChange = useCallback(function (value: string) {
    setCompanyFilter(value);
    setCurrentPage(1);
  }, []);

  const handleSortField = useCallback(function (value: SortField) {
    setSortField(value);
    setCurrentPage(1);
  }, []);

  const handleSortDirection = useCallback(function (
    value: "asc" | "desc"
  ) {
    setSortDirection(value);
    setCurrentPage(1);
  }, []);

  const filteredUsers = useMemo(function () {
    return filterUsers(
      users,
      debouncedSearch,
      cityFilter,
      companyFilter
    );
  }, [
    users,
    debouncedSearch,
    cityFilter,
    companyFilter
  ]);

  const sortedUsers = useMemo(function () {
    return sortUsers(
      filteredUsers,
      sortField,
      sortDirection
    );
  }, [
    filteredUsers,
    sortField,
    sortDirection
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedUsers.length / usersPerPage)
  );

  const pageUsers = useMemo(function () {
    return paginateUsers(
      sortedUsers,
      currentPage,
      usersPerPage
    );
  }, [
    sortedUsers,
    currentPage,
    usersPerPage
  ]);

  const cities = useMemo(function () {
    return Array.from(
      new Set(users.map(function (user) {
        return user.address.city;
      }))
    ).sort();
  }, [users]);

  const companies = useMemo(function () {
    return Array.from(
      new Set(users.map(function (user) {
        return user.company.name;
      }))
    ).sort();
  }, [users]);

  const handleToggleFavorite = useCallback(function (id: number) {
    setFavoriteIds(function (previous) {
      if (previous.includes(id)) {
        return previous.filter(function (favoriteId) {
          return favoriteId !== id;
        });
      }

      return [...previous, id];
    });
  }, []);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <section className="dashboard">

      <div className="page-heading">
        <div>
          <h2>All Users</h2>
          <p>Manage and explore your users</p>
        </div>

        <button
          className="export-button"
          disabled={sortedUsers.length === 0}
          onClick={function () {
            exportCsv(sortedUsers);
          }}
        >
          Export CSV
        </button>
      </div>

      <div className="dashboard-toolbar">

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <FilterBar
          cities={cities}
          companies={companies}
          cityFilter={cityFilter}
          companyFilter={companyFilter}
          onCityChange={handleCityChange}
          onCompanyChange={handleCompanyChange}
        />

        <SortControls
          sortField={sortField}
          sortDirection={sortDirection}
          onFieldChange={handleSortField}
          onDirectionChange={handleSortDirection}
        />

      </div>

      <div className="results-info">
        Showing{" "}
        {sortedUsers.length === 0
          ? 0
          : (currentPage - 1) * usersPerPage + 1}
        {" - "}
        {Math.min(
          currentPage * usersPerPage,
          sortedUsers.length
        )}
        {" of "}
        {sortedUsers.length} users
      </div>

      {pageUsers.length === 0 ? (
        <div className="empty-state">
          <h3>No users found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="user-grid">
          {pageUsers.map(function (user) {
            return (
              <UserCard
                key={user.id}
                user={user}
                isFavorite={favoriteIds.includes(user.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            );
          })}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </section>
  );
}

export default UserListPage;
