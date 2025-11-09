import express from 'express';
import {getListCars,getCarById,create,update,remove} from '../controllers/cars.controller.js';
import {auth} from '../middlewares/auth.js';
const app=express.Router();

app.get('/',getListCars);
app.get('/:id',getCarById);

app.post('/',auth,create);

app.put('/:id',auth,update);

app.delete('/:id',auth,remove);


export default app;
