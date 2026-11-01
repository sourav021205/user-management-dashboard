import { memo } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

function UserCard({ user, isFavorite, onToggleFavorite }: UserCardProps) {
  return (
    <div className="user-card">
      <div className="card-heading">
        <h3>{user.name}</h3>

        <button
          type="button"
          className="favorite-button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={function () {
            onToggleFavorite(user.id);
          }}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
      <p>
        <strong>City:</strong> {user.address.city}
      </p>

      <Link to={`/users/${user.id}`} className="details-link">
        View Details →
      </Link>
    </div>
  );
}

export default memo(UserCard);
