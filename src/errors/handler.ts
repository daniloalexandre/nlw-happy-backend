import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrorProps{
    [key: string] : string[]
}

const errorHandler :  ErrorRequestHandler = (error, req, res, next) => {
    if(error instanceof ValidationError){
        let errors : ValidationErrorProps = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })

        return res.status(400).json({message : 'Validation Fail', errors});
    }
    console.log(error);

    return res.status(500).json({ message : "Internal Server Error"});
}

export default errorHandler;