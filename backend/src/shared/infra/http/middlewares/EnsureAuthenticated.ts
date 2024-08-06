import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IPayload {
  subject: number
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("ERR_TOKEN_MISSING");
  }

  if (authHeader.length > 350) {
    throw new AppError("ERR_INVALID_TOKEN", 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const { subject: user_id } = verify(
      token,
      process.env.SECRET_TOKEN
    ) as IPayload


    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("ERR_INVALID_TOKEN", 401);
  }
}