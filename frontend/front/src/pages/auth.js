export const saveAuthStatus = (isLoggedIn) => {
  localStorage.setItem("isLoggedIn", isLoggedIn ? "1" : "0");
};

// Retrieve the user's authentication status from local storage
export const getAuthStatus = () => {
  return localStorage.getItem("isLoggedIn") === "1";
};
