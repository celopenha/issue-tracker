import { SHA256 as sha256 } from "crypto-js";

export const isValidEmail = (email: string) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
export const hashPassword = (password: string) => {
  return sha256(password).toString();
};
