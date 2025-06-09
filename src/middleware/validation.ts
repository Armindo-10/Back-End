import { type ErrorCode, HttpException } from '../exceptions/root.js'

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(422, errorCode, message, errorCode)
  }
}
