import { client } from "./index";

export const login = async (email, password) => {
  const res = await client.post("/api/auth/login", {
    email: email,
    password: password,
  });
  return res;
};

export const register = async (user) => {
  const res = await client.post("/api/auth/register", user);
  return res;
};
