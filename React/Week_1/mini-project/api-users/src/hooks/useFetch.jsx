import React, { useEffect, useState } from "react";

const UseFetch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //impoter l Api
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users data:", error);
        setError(error);
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  return { users, loading, error };
};

export default UseFetch;
