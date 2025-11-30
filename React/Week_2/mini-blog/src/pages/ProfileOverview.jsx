import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileOverview = () => {
  const user = useSelector((state) => ({
    email: state.auth.email,
    role: state.auth.userRole
  }));

  return (
    <div className="card">
      <div className="card-header bg-light">
        <h4 className="mb-0">Vue d'ensemble</h4>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <div className="mb-3">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                 style={{ width: '100px', height: '100px' }}>
              <h2 className="mb-0">{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</h2>
            </div>
          </div>
          <h3>{user.email}</h3>
          <span className="badge bg-primary">{user.role}</span>
        </div>
        
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Mes informations</h5>
                <p className="card-text">Gérez vos informations personnelles et vos préférences.</p>
                <Link to="/profile/info" className="btn btn-outline-primary">
                  Voir mes informations
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Mes articles</h5>
                <p className="card-text">Consultez et gérez vos articles publiés.</p>
                <Link to="/profile/posts" className="btn btn-outline-primary">
                  Voir mes articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
