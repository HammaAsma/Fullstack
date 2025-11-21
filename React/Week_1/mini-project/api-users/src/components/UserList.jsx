import React, { useMemo, useState } from "react";
import UseFetch from "../hooks/useFetch";
import UserCard from "./UserCard";

const UserList = () => {
  // Fetch API
  const { users, loading, error } = UseFetch();
  // Search
  const [search, setSearch] = useState("");
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Loading & Error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;

  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher..."
          onChange={handleSearch}
        />
      </div>

      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-md-4 mb-4">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
