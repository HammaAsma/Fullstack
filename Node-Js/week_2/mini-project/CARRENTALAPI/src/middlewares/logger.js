function logger(req,res,next){
    const date =new Date().toISOString();
    console.log(`${date}: ${req.method} ${req.originalUrl} `);
    next()
}
export default logger;