import React, { use } from "react";
import { Link } from "react-router-dom";

const Listusers = ({ users }) => {
  return (
    <div className="container mt-4">
      <h1 className="mb-3">Liste des utilisateurs</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link to={`/admin/users/user/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listusers;
