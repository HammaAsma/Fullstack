import path from 'path';
import {fileURLToPath} from 'url';
import { readFile,writeFile } from 'node:fs/promises'
import {getCar,updateCar} from './cars.service.js'

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const chemin=path.resolve(__dirname,'../data/rentals.json');

async function readRentals() {
  const data = await readFile(chemin, 'utf8');
  return JSON.parse(data);
}
async function writeRentals(rentals) {
  await writeFile(chemin, JSON.stringify(rentals, null, 2), 'utf8');
}
function differenceInDays(dateTo, dateFrom) {
  const d1 = new Date(dateFrom);
  const d2 = new Date(dateTo);
  return Math.max(1, Math.ceil((d2.getTime() - d1.getTime())/(1000*60*60*24)) + 1);
}

/**
 * @param {{status?:string, from?:date, to?:date, carId?: number, page?:number, limit?:number}} filters
 * @return {Promise<{data:rental[], total:number, page:number, limit:number, totalPages:number}>}
 */
export async function getRentals(filters={}) {
    let rentals = await readRentals();
    let filterRental=[...rentals]
    if(filters.status){
        filterRental=filterRental.filter(c=>c.status === filters.status)
    }
    
    if (filters.from && /^20[0-9]{2}\-[0-9]{2}\-[0-9]{2}$/.test(filters.from))
        filterRental = filterRental.filter((r) => r.from === filters.from);

    if (filters.to && /^20[0-9]{2}\-[0-9]{2}\-[0-9]{2}$/.test(filters.to))
        filterRental = filterRental.filter((r) => r.to === filters.to);

    if(filters.from && filters.to && filters.to < filters.from){
        throw new Error("la date de retoure doit être suppérieur à la date de départ");
    }

    if(filters.carId!==undefined){
        filterRental=filterRental.filter(c=>c.carId === Number(filters.carId))
    }


    /**Pagination */
    const page=Number(filters.page) || 1
    const limit=Number(filters.limit) || 10
    const total=filterRental.length;
    const totalPages=Math.ceil(total/ limit);

    const start=(page-1)*limit
    const end=start+limit
    const paginatedrentals=filterRental.slice(start,end)

    return{
        data:paginatedrentals,
        total,
        page,
        limit,
        totalPages
    }
}
/**
 * 
 * @param {number} id 
 * @return {Promise<rental>}
 */
export async function getRental(id) {
    const rentals = await readRentals();
    return rentals.find(r=>r.id===Number(id))
}
/**
 * {name:string, email:string} customer
 * @param {{carId:number,customer:object,from:string, to:string, days:number, dailyRate:number,total:number,status:string}} 
 * @return {Promise<rental>}
 */
export async function createRental(rental) {
    const car=await getCar(rental.carId);

    if(!car){
        throw new Error ("car not found");
    }
    if(car.available === false){
        throw new Error ("car not available");
    }
    let rentals = await readRentals();
    //calcule date To || days
    let days;
   if(rental.from){
    const dateFrom= new Date(rental.from);
    if(rental.days &&! rental.to){
        days=parseInt(rental.days);
        if(isNaN(days) || days <1){
            throw new Error("Le nomber de jours doit être strictement supérieur à zéro")
        }
        const dateTo=new Date(dateFrom);
        dateTo.setDate(dateFrom.getDate()+days);
        const dateToString=dateTo.toISOString().split('T')[0];

        rental.to=dateToString;
    }
    else if(rental.to && !rental.days){
        days=differenceInDays(rental.to,rental.from);
        rental.days=days;
    }

   }
   rental.id=rentals.length+1;
   rental.dailyRate=car.pricePerDay;
   if(isNaN(rental.days) || rental.days <1){
        throw new Error("Le nomber de jours doit être strictement supérieur à zéro")
    }

   rental.total=rental.dailyRate*rental.days;
   rental.status="active";
   rental.createdAt=new Date().toISOString();
   rental.updatedAt=new Date().toISOString();
   rentals.push(rental);
   await updateCar(car.id,{available : false});
   await writeRentals(rentals);
   return rental;
}
/**
 * 
 * @param {number} id 
 * @return {Promise<rental>}
 */
export async function returnRental(id) {
    let rentals = await readRentals();
    const index=rentals.findIndex(c=>c.id===Number(id));
    if(index === -1) throw new Error("rental not Found");
    if(rentals[index].status !== "active") throw new Error("rental not active");
    rentals[index].status="returned";
    rentals[index].updatedAt=new Date().toISOString();

    await updateCar(rentals[index].carId,{available: true});
    await writeRentals(rentals);

    return rentals[index];
}
/**
 * 
 * @param {number} id
 * @return {Promise<rental>} 
 */
export async function cancelRental(id) {
    let rentals = await readRentals();
    const index=rentals.findIndex(c=>c.id===Number(id));
    if(index === -1) throw new Error("rental not Found");
    if(rentals[index].status !== "active") throw new Error("rental not active");
    rentals[index].status="cancelled";
    rentals[index].updatedAt=new Date().toISOString();

    await updateCar(rentals[index].carId,{available: true});
    await writeRentals(rentals);

    return rentals[index];
    
}