export function errorHandler(err,req,res,next){
    res.status(err.statusCode||500).json({
            "status":err.status || 'error',
            "message":err.message,
            "code":err.statusCode || 500,
            "timestamp":new Date().toISOString(),
    });
}