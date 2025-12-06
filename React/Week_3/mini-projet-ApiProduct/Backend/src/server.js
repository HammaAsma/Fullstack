import express from "express";
import cors from "cors";
import route from "./routes/products.routes.js";

const PORT = process.env.PORT || 3000;

const serveur = express();

serveur.use(express.json());
serveur.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

serveur.get("/health", (req, res) => {
  res.send("OK");
});

serveur.use("/api/products", route);

async function StartServeur() {
  try {
    console.log("Connecté à la base de données MySQL!");

    serveur.listen(PORT, () => {
      console.log(`serveur runing in port ${PORT}`);
    });
  } catch (error) {
    console.log("Err lors de la connexion au bd", error);
    process.exit(1);
  }
}

StartServeur();
