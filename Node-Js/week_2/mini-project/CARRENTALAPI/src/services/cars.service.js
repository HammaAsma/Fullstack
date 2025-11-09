import { readFile,writeFile } from 'node:fs/promises'
import path from 'path';
import {fileURLToPath} from 'url';
import {readRentals,writeRentals} from './rentals.service.js';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const chemin=path.resolve(__dirname,'../data/cars.json');
//pour supp d'une car
const chemin_rental=path.resolve(__dirname,'../data/rentals.json');

//variable globale
async function readCars() {
  const data = await readFile(chemin, 'utf8');
  return JSON.parse(data);
}
async function writeCars(cars) {
  await writeFile(chemin, JSON.stringify(cars, null, 2), 'utf8');
}

/**
 * @param {{category?:string, available?:boolean, minPrice?:number, maxPrice?: number, q?:string, page?:number, limit?:number}} filters
 * @return {Promise<{data:car[], total:number, page:number, limit:number, totalPages:number}>}
 */
export async function getCars(filters={}) {
    let filteredCars = await readCars();
    if(filters.category){
        const filterCategory=filters.category.toLocaleLowerCase()
        filteredCars=filteredCars.filter(c=>c.category.toLocaleLowerCase() === filterCategory)
    }
     const available=filters.available === "true" ? true :
                    filters.available==='false'?false:
                    undefined

    if(available!==undefined){
        filteredCars=filteredCars.filter(c=>c.available === available)
    }

    const minPrice=parseFloat(filters.minPrice)
    const maxPrice=parseFloat(filters.maxPrice)

    if(!isNaN(minPrice)&&!isNaN(maxPrice)){
        
        filteredCars=filteredCars.filter(c=>c.pricePerDay >= minPrice && c.pricePerDay <= maxPrice)
    }
    else{
        if (!isNaN(minPrice) && minPrice > 0) {
            filteredCars = filteredCars.filter(c => c.pricePerDay >= minPrice);
        }
        if (!isNaN(maxPrice) && maxPrice > 0) {
            filteredCars = filteredCars.filter(c=> c.pricePerDay <= maxPrice);
        }
    }

    if(filters.q){
        const qLower = filters.q.toLowerCase();
        filteredCars=filteredCars.filter(
            (c=>(c.plate && c.plate.toLowerCase().includes(qLower))
            ||(c.model && c.model.toLowerCase().includes(qLower)))
        )
    }

    /**Pagination */
    const page=Number(filters.page) || 1
    const limit=Number(filters.limit) || 10
    const total=filteredCars.length;
    const totalPages=Math.ceil(total/ limit);

    const start=(page-1)*limit
    const end=start+limit
    const paginatedCars=filteredCars.slice(start,end)

    return{
        data:paginatedCars,
        total,
        page,
        limit,
        totalPages
    }
}
/**
 * 
 * @param {number} id 
 * @return {Promise<car>}
 */
export async function getCar(id) {
    const cars=await readCars();
    return cars.find(r=>r.id===Number(id))
}


/**
 * 
 * @param {{brand:string,model:string,category:string,plate:string,pricePerDay:number:available:boolean}} 
 * @return {Promise<car>}
 */
export async function createCar(params) {
    //test si la voiture déjà existe 
    let cars=await readCars();
    const existingCar=cars.find(c=>c.plate===params.plate);
    if(existingCar){
        throw new Error('une voiture existe déjà avec cette plaque');
    }
    const id=cars.length?cars[cars.length-1].id+1 : 1;
    const now=new Date().toISOString();
    const car={
        id,
        brand:params.brand,
        model:params.model,
        category:params.category,
        plate:params.plate,
        pricePerDay:params.pricePerDay,
        available:true,
        createdAt:now,
        updatedAt:now
    }
    cars.push(car);
    await writeCars(cars);
    return car;
}
/**
 * 
 * @param {number} id 
 * @param {{brand?:string,model?:string,category?:string,plate?:string,pricePerDay?:number:available?:boolean}} params
 * @return {Promise<car|null>}
 */
export async function updateCar(id,params) {  
    let cars= await readCars();
    const index=cars.findIndex(c=>c.id===Number(id));
    if(index=== -1){
        return null;
    }
    if(params.plate && params.plate !== cars[index].plate){
      const existingCar=cars.find(c=>c.plate===params.plate && c.id !== Number(id));
        if(existingCar){
            throw new Error('une voiture existe déjà avec cette plaque');
        }  
    }
    cars[index]={ ...cars[index], ...params,updatedAt:new Date().toISOString()}
    await writeCars(cars);
    return cars[index];
}
/**
 * 
 * @param {number} id
 * @return {Promise<boolean>} 
 */
export async function removeCar(id) {
    let cars= await readCars();
    const index=cars.findIndex(c=>c.id===Number(id));
    if(index=== -1){
        return false;
    }
    /*if(!cars[index].available){
        throw new Error("Impossible de supprimer une voiture louée !");
    }*/
    let rentals=await readRentals();
    const HasActiveRental=rentals.some(r=>r.carId === Number(id) && r.status === "active");
    if(HasActiveRental){
        throw new Error("Impossible de supprimer une voiture qui à encore une location active !");
    }
    cars=cars.filter(c=>c.id !== Number(id));
    await  writeCars(cars);
//supprimer toutes les lignes de location de cette viture
    const filterRentals=rentals.filter(r=>r.carId !== Number(id));
    await writeRentals(filterRentals);

    return true;
}