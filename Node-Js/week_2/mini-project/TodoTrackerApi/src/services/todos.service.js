
import path from 'path';
import {fileURLToPath} from 'url';
import {readFile, writeFile} from 'node:fs/promises';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const chemin=path.resolve(__dirname,'../data/todos.json');

function validerParams(title,priority,dueDate){
    if(!title || !title.trim()){
        const err=new Error("title requis")
        err.status=400
        throw err
    }
    if(priority && !["low","medium","high"].includes(priority)){
        const err=new Error("Priority doit être soit low,medium ou high")
        err.status=400
        throw err
    }
    if(dueDate &&!/^20[0-9]{2}\-[0-9]{2}\-[0-9]{2}$/.test(dueDate)){
        const err=new Error("format de date non valide")
        err.status=400
        throw err
    }
}
/**
 * 
 * @return {Promise<todos[]>}
 */
export async function listTodos() {
    const data = await readFile(chemin,'utf8');
    return JSON.parse(data);
}
/**
 * 
 * @param {{page?:number,limit?:number,status?:string,priority?:string,q?:string,sort?:string}} query 
 * @return {Promise<{page:number,limit:number,total:number,totalPages:number,data:todos[]}>}
 */
export async function FilterTodos(query) {
    let {page=1,limit=10,status="all",priority,q,sort} = query
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
            const querystg=q.toLowerCase()
            todos=todos.filter(t=>t.title.toLowerCase().includes(querystg))
        }
        if(sort){
            const order=sort.toLowerCase();
            if(order==='asc') todos.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt));
            else if(order==='desc') todos.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));
        }
        const start=(page-1)*limit
        const end=start+limit

        return {
            page,
            limit,
            total:todos.length,
            totalPages:Math.ceil(todos.length/limit),
            data:todos.slice(start,end)
        }
}
/**
 * 
 * @param {number} id 
 * @return {Promise<todo|null>}
 */
export async function getTodosById(id) {
    const todos= await listTodos();
    return todos.find(t=>t.id==Number(id)) ?? null
}
/**
 * 
 * @param {{title:string,completed?:boolean,priority?:string,dueDate?:string}} params
 * @return {Promise<todo>}
 */
export async function createTodo(params) { 
    const todos=await listTodos();
    const id=todos.length?todos[todos.length-1].id+1 : 1;
    validerParams(params.title,params.priority,params.dueDate)
    const now=new Date().toISOString()
    const todo={
        id,
        title:params.title,
        completed:false,
        priority:params.priority?? "medium",
        dueDate:params.dueDate?? null,
        createdAt:now,
        updatedAt:now
    }
    todos.push(todo)
    await writeFile(chemin,JSON.stringify(todos))
    return todo
}
/**
 * @param {number} id 
 * @param {{title?:string,completed?:boolean,priority?:string,dueDate?:string}} params 
 * @return {Promise<todo|null>}
 */
export async function updateTodo(id,params) {
    const todos = await listTodos()
    const index=todos.findIndex(t=>t.id===Number(id))
    if(index=== -1){
        return null
    }
    validerParams(params.title,params.priority,params.dueDate)

    todos[index]={ ...todos[index], ...params,updatedAt:new Date().toISOString()}
    await writeFile(chemin,JSON.stringify( todos,null,2))
    return todos[index]
}
/**
 * 
 * @param {number} id 
 */
export async function removeTodo(id) {
    const todos = await listTodos();
    return await  writeFile(chemin,JSON.stringify(todos.filter(t=>t.id !== Number(id)),null,2),'utf8');
}
/**
 * 
 * @param {number} id 
 * @param {boolean} completed
 * @return {Promise<todo|null>}
 */
export async function inverserCompleted(id,completed) {
    const todos = await listTodos()
    const index=todos.findIndex(t=>t.id==Number(id))
    if(index=== -1) return null
    todos[index]={ ...todos[index], completed,updatedAt:new Date().toISOString()}
    await writeFile(chemin,JSON.stringify( todos,null,2))
    return todos[index]
}
