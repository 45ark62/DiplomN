import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const loggedInClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const interceptor = (config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.authorization = user.token;
  }
  return config;
};

loggedInClient.interceptors.request.use(interceptor);

const getUserFromLocalStorage = () => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export {
  client,
  loggedInClient,
  getUserFromLocalStorage,
  saveUserToLocalStorage,
};
