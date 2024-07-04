// jwtUtils.js
import * as jose from "jose";
import config from "../config";

export const generateToken = async (payload) => {
  try {
    const secret = new TextEncoder().encode(config.secret_login_key);
    const alg = config.alg;

    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};
