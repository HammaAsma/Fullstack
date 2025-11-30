import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Message envoyé : " + message);

    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form
        className="card p-4 shadow"
        style={{ width: "400px" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="message" className="form-label">
          Votre Message:
        </label>
        <textarea
          className="form-control mb-3"
          id="message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-primary w-100">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact;
