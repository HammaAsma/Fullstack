import {listTodos,getTodosById,createTodo,updateTodo,removeTodo,inverserCompleted} from '../services/todos.service.js';

export async function getTodos(req,res,next) {
    try{
        
        let {page=1,limit=10,status="all",priority,q,sort} = req.query
        page=parseInt(page)
        limit=parseInt(limit)

        if(isNaN(page) || page < 1){
            page=1;
        }
        if(isNaN(limit) || limit < 1){
            limit=10;
        }
        let todos = await listTodos()
        if(status=="active"){
            todos=todos.filter(t=>!t.completed)
        }
        else if(status=="completed"){
            todos=todos.filter(t=>t.completed)
        }
        const allpriopity=["low","medium","high"]
        if(priority && allpriopity.includes(priority)){
            todos=todos.filter(t=>t.priority===priority)
        }
        if(q){
            const query=q.toLowerCase()
            todos=todos.filter(t=>t.title.toLowerCase().includes(query))
        }
        if(sort){
            const order=sort.toLowerCase();
            if(order==='asc') todos.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt));
            else if(order==='desc') todos.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));
        }
        const start=(page-1)*limit
        const end=start+limit
        res.json({
            page,
            limit,
            total:todos.length,
            totalPages:Math.ceil(todos.length/limit),
            data:todos.slice(start,end)
        })
    }
    catch(e){
        next(e)
    }
    
}

export async function getTodo(req,res) {
    const id=Number(req.params.id)
    const todo = await getTodosById(id)
    if(!todo) return res.status(404).json({error:"todo not found!"})
    return res.json(todo)
}

export async function create(req,res,next) {
    try{
        const element=req.body
        const todo=await createTodo(element)
        res.status(201).json(todo)
    }
    catch(e){
        next(e)
    }
    
}

export async function update(req,res,next) {
    try{
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
    catch(e){
        next(e)
    }
    
}

export async function remove(req,res) {
    const id=Number(req.params.id)
    await removeTodo(id)
    res.status(204).end()
}

export async function inverser(req,res,next) {
    try{
        const id=Number(req.params.id)
        const todo=await getTodosById(id)
        if(!todo) return res.status(404).json({error:"todo not found!"})
        const updCompleted=await inverserCompleted(id,!Boolean(todo.completed))
        if(!updCompleted) return res.status(500).json({error:"completed non inversé"})
        return res.status(200).json(updCompleted)
    }
    catch(e){
        next(e)
    }
    
    
}