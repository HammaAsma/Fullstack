import 'dotenv/config';
import express from "express";
import routerCar from "./routes/cars.routes.js";
import routerRental from "./routes/rentals.routes.js";
import logger from "./middlewares/logger.js";
import open from "open";
import path from "path";
import { fileURLToPath } from "url";

const app=express();
const PORT=process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.use(logger)

app.use('/api/cars',routerCar)
app.use('/api/rentals',routerRental)

app.listen(PORT,()=>{
    console.log(`Serveur lancé sur le port : ${PORT}`);
    open(`http://localhost:${PORT}`);
});