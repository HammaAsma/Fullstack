import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import Logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

import todosRouter from "./routes/todoRoute.js";
import userRouter from "./routes/userRoute.js";
import config from "./config/config.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//sécurité API
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

import connectToDB from "./config/database.js";
const MONGO_URL = config.MONGO_URL;
connectToDB(MONGO_URL);

app.use(Logger());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend statique

app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to TODO TRACKER API",
    version: "2.0.0",
    endpoints: {
      auth: "/api/user",
      todos: "/api/todos",
    },
  });
});

app.use("/api/user", userRouter);
app.use("/api/todos", todosRouter);

// Page d'accueil -> index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// Gestionnaire d'erreurs global
app.use(errorHandler);

export default app;
