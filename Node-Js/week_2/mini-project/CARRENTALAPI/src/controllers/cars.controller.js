import {getCars,getCar,createCar,removeCar,updateCar} from '../services/cars.service.js';

//Validation params
function validation(query,cars=[]){
    const allCategory=["eco","sedan","suv","van"];
    const errors=[];
    if(!query.brand) errors.push("brand obligatoire!");
    if(!query.model) errors.push("model obligatoire!");

    if(!allCategory.includes(query.category))errors.push('category non valide');
    if(typeof query.pricePerDay!=="number" || query.pricePerDay <= 0)errors.push("pricePerDay non valide");

    if(!query.plate){
        errors.push("plate obligatoire!");
    }else{
        const plateExiste=cars.find(c=>c.plate === query.plate);
        if(plateExiste)errors.push("plate doit être unique");
    }
    return errors;
}

export async function getListCars(req,res) {
    const filters= {
        category: req.query.category,
        available: req.query.available,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        q: req.query.q,
        page: req.query.page,
        limit: req.query.limit
    };
    if (
        filters.minPrice !== undefined &&
        filters.maxPrice !== undefined &&
        filters.minPrice !== '' &&
        filters.maxPrice !== '' &&
        Number(filters.minPrice) > Number(filters.maxPrice)
    ) {
        return res.status(400).json({ error: "minPrice doit être inférieur ou égal à maxPrice" });
    }
    try{
        const cars=await getCars(filters);
        return res.status(200).json(cars);
    }
    catch(e){
        res.status(400).json({error:e.message || "Erreur!!"});
    }
}

export async function getCarById(req,res) {
    const id=Number(req.params.id);
    const car = await getCar(id);
    if(!car) return res.status(404).json({error:"car not found!"});
    return res.status(200).json(car);
}

export async function create(req,res) {
    const query=req.body;
    const cars=await getCars();
    const carsArray = Array.isArray(cars) ? cars : cars.data;
    const errors=validation(query,carsArray);
    if(errors.length>0){
        return res.status(400).json({errors});
    }
    const car=await createCar(query);
    res.status(201).json(car);
    
}

export async function update(req,res) {
    const id=Number(req.params.id);
    const {brand,model,category,plate,pricePerDay,available}=req.body;
    const cars=await getCars();
    const carsArray = Array.isArray(cars) ? cars : cars.data;
    const errors=validation(req.body,carsArray);
    if(errors.length>0){
        return res.status(400).json({errors});
    }
    const car=await getCar(id);
    if(!car) return res.status(404).json({error:"car non trouvé"});
   
    const params={};
    if(brand!==undefined) params.brand=brand;
    if(model!==undefined) params.model=model;
    if(category!==undefined) params.category=category;
    if(plate!==undefined) params.plate=plate;
    if(pricePerDay!==undefined) params.pricePerDay=pricePerDay;
    if(available!==undefined) params.available=available;
    
    try{
        const updated_car=await updateCar(id,params);
        return res.status(200).json(updated_car);
    }catch(e){
        res.status(400).json({error:e.message || "Erreur!!"});
    }
     
}

export async function remove(req,res) {
    const id=Number(req.params.id);
    try{
        const deleted = await removeCar(id);
        if(!deleted){
            return res.status(404).json({error:"car non trouvé"});
        }
        res.status(200).json({message:"voiture supprimée avec succès"});
    }catch(e){
        res.status(400).json({message:e.message});
    }
}
