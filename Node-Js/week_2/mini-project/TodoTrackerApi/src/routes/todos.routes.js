import express from 'express'
import {getTodos,getTodo,create,update,remove,inverser} from '../controllers/todos.controller.js'

const app=express.Router()

app.get('/',getTodos)
app.get('/:id',getTodo)
app.post('/',create)
app.patch('/:id',update)
app.delete('/:id',remove)
app.patch('/:id/toggle',inverser)

export default app;
