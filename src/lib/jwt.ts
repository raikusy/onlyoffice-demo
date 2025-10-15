import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "a4blspeq97syka5z2nw12ulf";

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
