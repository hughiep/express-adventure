import { NextFunction } from "express";

class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    isOperational: boolean,
    description: string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    // Custom debugging info
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational; // Operational error

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this); // Maintains proper stack trace for where our error was thrown (only available on V8)
    }
  }
}

//free to extend the BaseError
export class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "internal server error"
  ) {
    super(name, httpCode, isOperational, description);
  }
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

class HTTP400Error extends BaseError {
  constructor(description = "Bad request") {
    super("NOT FOUND", HttpStatusCode.BAD_REQUEST, true, description);
  }
}

class ErrorHandler {
  public handleError(err: Error) {
    console.error(
      "Error message from the centralized error-handling component",
      err
    );
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();

export async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  errorHandler.handleError(err);
}
