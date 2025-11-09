export function auth(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).json({error:'accée non autoriser! '});
    }   
    const token=req.headers.authorization.split(' ')[1];
    if(!token || token!==process.env.API_TOKEN){
        return res.status(401).json({error:"Token invalide"});
    }
    next()
}
export default auth;