import { useSelector } from 'react-redux';

const ProfileInfo = () => {
  const user = useSelector((state) => ({
    email: state.auth.email,
    role: state.auth.userRole
  }));

  return (
    <div className="card">
      <div className="card-header bg-light">
        <h4 className="mb-0">Mes informations</h4>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <h5>Détails du compte</h5>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Rôle :</strong> {user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;