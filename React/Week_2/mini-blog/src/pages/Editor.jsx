import React from 'react';
import { useNavigate } from 'react-router-dom';

const Editor = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Éditeur</h2>
            </div>
            <div className="card-body">
              <p className="lead">Bienvenue dans l'éditeur</p>
              <p>Cette page est accessible uniquement aux utilisateurs avec le rôle 'editor' ou 'admin'.</p>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;