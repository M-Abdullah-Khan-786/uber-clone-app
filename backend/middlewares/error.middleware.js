const errorMiddleware = (err,req,res,next)=>{
    const statusCodes = err.statusCode || 500
    const message = err.message || "Internal server error"

    return res.status(statusCodes).json({
        success: false,
        message
    })
}

const errorHandle = (statusCode, message) => {
    const error = new Error
    error.statusCode = statusCode
    error.message = message
    return error
}

module.exports = {
    errorMiddleware,
    errorHandle
}