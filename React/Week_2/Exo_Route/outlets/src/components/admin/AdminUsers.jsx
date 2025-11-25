import Listusers from "../Users/Listusers";

export default function AdminUsers({ users }) {
  return (
    <div>
      <h2>Gestion des utilisateurs</h2>
      <Listusers users={users} />
    </div>
  );
}
