
import { Request, Response, NextFunction } from 'express';
import { appError } from '../utils/AppError';
import { authenticationError, authorizationError, badRequestError, conflictError, informationalError, notFoundError } from '../utils/errorStatusCodes';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Something went wrong. Please try again later.';
  let status = 'unexpected';

  // Si el error es una instancia de appError
  if (err instanceof appError) {
    statusCode = err.statusCode;
    message = err.message;
    status = 'error';
  }

  // Si el error es una validación o de autorización, aún lo gestionamos específicamente
  if (err instanceof informationalError || err instanceof badRequestError || err instanceof authenticationError
     || err instanceof authorizationError || err instanceof notFoundError || err instanceof conflictError) {
      
    statusCode = err.statusCode;
    message = err.message;
    status = 'error';
  }

  // Loguear solo los errores inesperados
  if (!(err instanceof informationalError) && !(err instanceof badRequestError) && !(err instanceof authenticationError)
    && !(err instanceof authorizationError) && !(err instanceof notFoundError) && !(err instanceof conflictError)) {

    console.error('Unexpected error:', err);
  }

  res.status(statusCode).json({
    success: false,
    status,
    message,
  });
};
