import { Link } from 'react-router-dom';

const ProfilePosts = () => {
  const userPosts = []; 

  return (
    <div className="card">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Mes articles</h4>
        
      </div>
      <div className="card-body">
        {userPosts.length === 0 ? (
          <div className="text-center py-5">
            <h5>Vous n'avez pas encore publié d'articles</h5>
            
          </div>
        ) : (
          <div className="list-group">
            {userPosts.map((post) => (
              <div key={post.id} className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{post.title}</h5>
                  <small>{post.date}</small>
                </div>
                <p className="mb-1">{post.excerpt}</p>
                <div>
                  <Link to={`/articles/${post.id}/edit`} className="btn btn-sm btn-outline-primary me-2">
                    Modifier
                  </Link>
                  <button className="btn btn-sm btn-outline-danger">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePosts;