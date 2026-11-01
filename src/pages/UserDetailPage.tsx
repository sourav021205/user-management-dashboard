
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { getUserById } from "../api/usersApi";
import type { User } from "../types/user";

import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

interface UserResult {
  id: string;
  attempt: number;
  user: User | null;
  error: string | null;
}

function UserDetailPage() {
  const { id } = useParams();

  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState<UserResult | null>(null);

  useEffect(function () {
    if (!id) {
      return;
    }

    let active = true;

    getUserById(id)
      .then(function (data) {
        if (active) {
          setResult({
            id: id,
            attempt: retryCount,
            user: data,
            error: null
          });
        }
      })
      .catch(function (err: unknown) {
        if (active) {
          setResult({
            id: id,
            attempt: retryCount,
            user: null,
            error:
              err instanceof Error
                ? err.message
                : "Unable to load user"
          });
        }
      });

    return function () {
      active = false;
    };
  }, [id, retryCount]);

  if (!id) {
    return <p>User ID is missing.</p>;
  }

  const currentResult =
    result &&
    result.id === id &&
    result.attempt === retryCount
      ? result
      : null;

  if (!currentResult) {
    return <LoadingState />;
  }

  if (currentResult.error) {
    return (
      <ErrorState
        message={currentResult.error}
        onRetry={function () {
          setRetryCount(function (count) {
            return count + 1;
          });
        }}
      />
    );
  }

  const user = currentResult.user;

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <section className="detail-container">

      <Link to="/" className="back-link">
        ← Back to Users
      </Link>

      <div className="detail-header">
        <h2>{user.name}</h2>
        <p>@{user.username}</p>
      </div>

      <div className="detail-grid">

        <div className="detail-card">
          <h3>Basic Information</h3>

          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>

        <div className="detail-card">
          <h3>Address Information</h3>

          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Suite:</strong> {user.address.suite}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
          <p><strong>Latitude:</strong> {user.address.geo.lat}</p>
          <p><strong>Longitude:</strong> {user.address.geo.lng}</p>
        </div>

        <div className="detail-card">
          <h3>Company Information</h3>

          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
          <p><strong>Business Description:</strong> {user.company.bs}</p>
        </div>

      </div>
    </section>
  );
}

export default UserDetailPage;
