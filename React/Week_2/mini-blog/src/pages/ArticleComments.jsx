import { useParams, Link } from "react-router-dom";

const ArticleComments = () => {
  const { id } = useParams();

  const fakeComments = {
    1: ["Super article !", "Très clair, merci."],
    2: ["J'ai enfin compris les routes dynamiques."],
  };

  const comments = fakeComments[id];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h3 className="card-title mb-3">
          💬 Commentaires de l’article{" "}
          <span className="text-primary">{id}</span>
        </h3>

        {comments ? (
          <ul className="list-group mb-3">
            {comments.map((c, index) => (
              <li key={index} className="list-group-item">
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-info">
            Aucun commentaire pour l’instant.
          </div>
        )}

        <Link to={`/articles/${id}`} className="btn btn-outline-dark">
          ⬅ Retour à l'article
        </Link>
      </div>
    </div>
  );
};

export default ArticleComments;
