import type {Response} from 'express';



export const sendSuccess = (res:Response, statusCode:number, message:string, data:unknown = null, meta:object={}) => {
    return res.status(statusCode).json({
        success:true,
        statusCode,
        message,
        data,
        meta
    })
}


export const sendError = (res:Response, statusCode:number, message:string, errors:unknown[] = [], requestId?:string) => {

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
        errors,
        requestId
    })
}
    