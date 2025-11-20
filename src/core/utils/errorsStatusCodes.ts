import { appError } from "./AppError";


//////////////// STATUS CODE FOR UNAUTHORIZED RESPONSE
class informationalError extends appError {
  constructor(message: string) {
    super(message, 203);
  }
}
////////////////  INVALID OR INCORRECTLY FORMATTED DATA
class badRequestError extends appError {
  constructor(message: string) {
    super(message, 400);
  }
}

//////////////// STATUS CODE FOR UNAUTHENTICATED RESPONSE
class authenticationError extends appError {
  constructor(message: string) {
    super(message, 401);
  }
}
//////////////// STATE CODE OF PROHIBITION
class authorizationError extends appError {
  constructor(message: string) {
    super(message, 403);
  }
}

///////////////   DOES NOT EXIST ON THE SERVER
class notFoundError extends appError {
  constructor(message: string) {
    super(message, 404);
  }
}

///////////////   CONFLICT BETWEEN THE CURRENT RESOLUTION AND THE REQUESTED ACTION
class conflictError extends appError {
  constructor(message: string) {
    super(message, 409);
  }
}

export { informationalError, badRequestError, authenticationError, authorizationError, notFoundError, conflictError}