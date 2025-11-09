import {getRentals,getRental,createRental,returnRental,cancelRental} from '../services/rentals.service.js';

//Validation params
function validation(rental){
    const errors=[];
    if(!rental.carId) errors.push("brand obligatoire!");
   // if(!rental.customer ||!rental.customer.name) errors.push("customer obligatoire!");

    //email
   /* const regexEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!rental.customer.email || !regexEmail.test(rental.customer.email)){
        errors.push("email non valide");
    }*/
    //date
    if(!rental.from)errors.push("form date obligatoire");
    if(!rental.to)errors.push("to date obligatoire!");
    const regexDate=/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
    if(rental.from && !regexDate.test(rental.from))errors.push("format date from non valide");
    if(rental.to && !regexDate.test(rental.to))errors.push("format date to non valide");

    if(rental.from && rental.to){
        const fromDate=new Date(rental.from);
        const toDate=new Date(rental.to);
        if(fromDate > toDate)errors.push("from date doit être inf à to date");
    }
    return errors;
}

export async function getListRentals(req,res) {
    const filters= {
        status: req.query.status,
        from: req.query.from,
        to: req.query.to,
        carId: req.query.carId,
        page: req.query.page,
        limit: req.query.limit
    };
    const rentals=await getRentals(filters);
    return res.status(200).json(rentals);
}

export async function getRentalById(req,res) {
    const id=Number(req.params.id)
    const rental = await getRental(id)
    if(!rental) return res.status(404).json({error:"rental not found!"})
    return res.status(200).json(rental)
}

export async function create(req,res) {
    try{
        const query=req.body
        const errors=validation(query);
        if(errors.length>0){
            return res.status(400).json({errors});
        }
        const rental=await createRental(query)
        
        res.status(201).json(rental)
    }catch(err){
        return res.status(500).json({error:err.message || "Erreur"})
    }
    
}

export async function returned(req,res) {
    try{
        const rental=await returnRental(req.params.id)
        res.status(200).json(rental)
    } 
    catch(e){
        return res.status(400).json({error:e.message || "Erreur"});
    }
      
}

export async function removeRental(req,res) {
    try{
        const rental=await cancelRental(req.params.id)
        res.status(200).json(rental)
    } 
    catch(e){
        return res.status(400).json({error:e.message || "Erreur"});
    }
}
