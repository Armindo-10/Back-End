import type { NextFunction, Request, Response } from 'express'
import type { HttpException } from '../exceptions/root.js'

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
  })
}
