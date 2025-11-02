import { error } from 'node:console';
import {readFile, writeFile} from 'node:fs/promises';
import { title } from 'node:process';

const chemin='data/todos.json';

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
 * @param {number} id 
 * @return {Promise<todo>}
 */
export async function getTodosById(id) {
    const todos= await listTodos();
    return todos.find(t=>t.id==Number(id))
}
/**
 * 
 * @param {{title:string,completed?:boolean,priority?:string,dueDate?:Date,createdAt:Date,updatedAt:date }} params
 * @return {Promise<todo>}
 */
export async function createTodo(params) { 
    const todos=await listTodos();
    const id=todos.length?todos[todos.length-1].id+1 : 1;
    //title requis
    if(!params.title || !params.title.trim()){
        const err=new error("title requis")
        err.status=400
        throw err
    }
    if(params.priority && !["low","medium","high"].includes(params.priority)){
        const err=new Error("Priority doit être soit low,medium ou high")
        err.status=400
        throw err
    }
    if(params.dueDate &&!/^20[0-9]{2}\-[0-9]{2}\-[0-9]{2}/.test(params.dueDate)){
        const err=new Error("format de date non valide")
        err.status=400
        throw err
    }
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
 * @param {{title?:string,completed?:boolean,priority?:string,dueDate?:Date}} params 
 * @return {Promise<todo>}
 */
export async function updateTodo(id,params) {
    const todos = await listTodos()
    const index=todos.findIndex(t=>t.id==id)
    if(index=== -1){
        return null
    }
    if(params.priority!==undefined){
        const priority_=["low","medium","high"]
        if(!priority_.includes(params.priority)){
            const err=new Error("Priority doit être soit low,medium ou high")
            err.status=400
            throw err
        }
    }
    if(params.dueDate!==undefined){
        const regex=/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/
        if(!regex.test(params.dueDate)){
            const err=new Error("format de date non valide")
            err.status=400
            throw err
        }
    }

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
 * @return {Promise<todo>}
 */
export async function inverserCompleted(id,completed) {
    const todos = await listTodos()
    const index=todos.findIndex(t=>t.id==Number(id))
    if(index=== -1) return null
    todos[index]={ ...todos[index], completed}
    await writeFile(chemin,JSON.stringify( todos,null,2))
    return todos[index]
}
