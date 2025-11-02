import express from "express";
import router from "./routes/todos.routes.js";

const app=express();
const PORT=process.env.PORT || 3000;



app.use(express.json())

app.use('/api/todos',router)

app.listen(PORT,()=>{
    console.log(`Serveur lancé sur le port : ${PORT}`);
});