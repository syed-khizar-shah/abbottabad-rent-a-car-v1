import { SignJWT, jwtVerify, decodeJwt } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Convert secret string to Uint8Array for jose
const getSecretKey = () => {
  return new TextEncoder().encode(JWT_SECRET);
};

/**
 * Sign a JWT token (Edge-compatible)
 */
export async function signToken(payload: Record<string, any>, expiresIn: string = "7d"): Promise<string> {
  const secret = getSecretKey();
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

  return token;
}

/**
 * Verify a JWT token (Edge-compatible)
 */
export async function verifyToken(token: string): Promise<any> {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

/**
 * Decode a JWT token without verification (Edge-compatible)
 */
export function decodeToken(token: string): any {
  try {
    return decodeJwt(token);
  } catch (error) {
    throw new Error("Failed to decode token");
  }
}
