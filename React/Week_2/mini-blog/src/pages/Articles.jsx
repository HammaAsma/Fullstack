import { Outlet, Link, useLocation } from "react-router-dom";
import { articles } from "../data/articles";

const Articles = () => {
  const location = useLocation();
  const currentId = location.pathname.split("/")[2]; // id de l'article actif

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-3">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h5 className="mb-0">📚 Liste des Articles</h5>
            </div>

            <div className="list-group list-group-flush">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.id}`}
                  className={`list-group-item list-group-item-action d-flex align-items-center ${
                    String(article.id) === currentId ? "active" : ""
                  }`}
                >
                  📄 <span className="ms-2">{article.titre}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Contenu dynamique */}
        <main className="col-9">
          <div className="card shadow-sm p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Articles;
