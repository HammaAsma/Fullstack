import {listTodos,FilterTodos,getTodosById,createTodo,updateTodo,removeTodo,inverserCompleted} from '../services/todos.service.js';

export async function getTodos(req,res,next) {
   const todos=
    Object.keys(req.query).length > 0 ? await FilterTodos(req.query)
                                        :await listTodos()
  return res.status(200).json(todos)
}

export async function getTodo(req,res) {
    const id=Number(req.params.id)
    const todo = await getTodosById(id)
    if(!todo) return res.status(404).json({error:"todo not found!"})
    return res.status(200).json(todo)
}

export async function create(req,res,next) {
    const element=req.body
    const todo=await createTodo(element)
    res.status(201).json(todo)
    
}

export async function update(req,res,next) {
    
    const id=Number(req.params.id)
    const {title,completed,priority,dueDate}=req.body
    const todo=await getTodosById(id)
    if(!todo) return res.status(404).json({error:"todo non trouvé"})
    const params={}
    if(title!==undefined) params.title=title
    if(completed!==undefined) params.completed=completed
    if(priority!==undefined) params.priority=priority
    if(dueDate!==undefined) params.dueDate=dueDate
    const updateTodo_=await updateTodo(id,params)
    return res.status(200).json(updateTodo_)
   
    
}

export async function remove(req,res) {
    const id=Number(req.params.id)
    await removeTodo(id)
    res.status(204).end()
}

export async function inverser(req,res,next) {
    const id=Number(req.params.id)
    const todo=await getTodosById(id)
    if(!todo) return res.status(404).json({error:"todo not found!"})
    const updCompleted=await inverserCompleted(id,!Boolean(todo.completed))
    if(!updCompleted) return res.status(500).json({error:"completed non inversé"})
    return res.status(200).json(updCompleted)
    
}