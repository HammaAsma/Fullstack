import express from 'express'
import {getListRentals,getRentalById,create,returned,removeRental} from '../controllers/rentals.controller.js'
import { auth } from '../middlewares/auth.js'

const app=express.Router()

app.get('/',getListRentals)
app.get('/:id',getRentalById)

app.post('/',auth,create)

app.put('/:id/return',auth,returned)

app.delete('/:id',auth,removeRental)


export default app;
