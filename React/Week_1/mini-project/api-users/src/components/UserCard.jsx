import React from "react";
import useToggle from "../hooks/useToggle";

const UserCard = ({ user, theme }) => {
  // show details
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <div
      className={
        theme === "light"
          ? "card shadow-sm h-100"
          : "card shadow-sm h-100 bg-secondary text-white"
      }
    >
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>

        <p className="card-text mb-1">
          <strong>Email :</strong> {user.email}
        </p>
        {showDetails && (
          <>
            <p className="card-text mb-1">
              <strong>Ville :</strong> {user.address?.city}
            </p>

            <p className="card-text small">
              📞 {user.phone} <br />
              🌍 {user.website} <br />
              🏢 {user.company?.name}
            </p>
          </>
        )}
        <button
          className={`btn btn-sm ${
            theme === "light" ? "btn-dark" : "btn-light"
          } mt-2`}
          onClick={toggleDetails}
        >
          {showDetails ? "Masquer" : "Détails"}
        </button>
      </div>
    </div>
  );
};
export default UserCard;
