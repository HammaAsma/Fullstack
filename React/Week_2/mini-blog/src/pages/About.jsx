const About = () => {
  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h1 className="card-title">À propos</h1>

        <div className="container mt-5">
          <div className="mb-5 p-4 bg-white rounded shadow-sm">
            <h2 className="text-primary mb-4">Objectif pédagogique</h2>
            <p>
              Ce Mini-Blog est un projet pédagogique conçu pour démontrer et
              enseigner les concepts fondamentaux de React Router et Redux
              Toolkit.
            </p>
            <p>
              L'application illustre comment créer une architecture de routage
              complète avec des routes simples, dynamiques, imbriquées et
              protégées, tout en gérant l'état global de l'application de
              manière efficace.
            </p>
          </div>
        </div>
        <div className="container mt-5">
          <div className="mb-5 p-4 bg-white rounded shadow-sm">
            <h2 className="text-primary mb-4">Technologies utilisées</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex">
                <strong className="me-2">React 18</strong> - Bibliothèque
                JavaScript pour construire des interfaces utilisateur
              </li>
              <li className="list-group-item d-flex">
                <strong className="me-2">React Router v6</strong> - Bibliothèque
                de routage pour React
              </li>
              <li className="list-group-item d-flex">
                <strong className="me-2">Redux Toolkit</strong> - Boîte à outils
                officielle pour Redux
              </li>
              <li className="list-group-item d-flex">
                <strong className="me-2">Vite</strong> - Outil de build moderne
                et rapide
              </li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded shadow-sm">
            <h2 className="text-primary mb-4">Concepts couverts</h2>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <h5 className="text-primary">Routes simples</h5>
                  <p className="mb-0">
                    Navigation de base entre différentes pages
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <h5 className="text-primary">Routes dynamiques</h5>
                  <p className="mb-0">
                    Utilisation de useParams pour des URL paramétrées
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <h5 className="text-primary">Routes imbriquées</h5>
                  <p className="mb-0">
                    Layouts avec Outlet pour une structure modulaire
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <h5 className="text-primary">Navigation programmée</h5>
                  <p className="mb-0">
                    useNavigate pour rediriger l'utilisateur
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <h5 className="text-primary">Routes protégées</h5>
                  <p className="mb-0">
                    Contrôle d'accès basé sur l'authentification
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <h5 className="text-primary">Gestion d'état Redux</h5>
                  <p className="mb-0">Store global avec Redux Toolkit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="mb-5 p-4 bg-white rounded shadow-sm">
            <h2 className="text-primary mb-4">Structure du projet</h2>
            <p>
              Le projet suit une architecture modulaire avec séparation des
              préoccupations. Les composants sont organisés par fonctionnalité,
              les routes sont centralisées, et l'état global est géré via Redux
              slices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
