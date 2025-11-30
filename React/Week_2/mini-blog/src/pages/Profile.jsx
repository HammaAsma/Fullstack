import { Outlet, NavLink } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Mon Profil</h5>
            </div>
            <div className="list-group list-group-flush">
              <NavLink 
                to="/profile" 
                end
                className={({ isActive }) => 
                  `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                }
              >
                Vue d'ensemble
              </NavLink>
              <NavLink 
                to="/profile/info" 
                className={({ isActive }) => 
                  `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                }
              >
                Mes informations
              </NavLink>
              <NavLink 
                to="/profile/posts" 
                className={({ isActive }) => 
                  `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                }
              >
                Mes articles
              </NavLink>
            </div>
          </div>
        </div>
        
        {/* Contenu principal */}
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
