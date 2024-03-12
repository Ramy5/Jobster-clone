export interface User_TP {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token: string;
}

export const addToLocalStorage = (user: User_TP) =>
  localStorage.setItem("user", JSON.stringify(user));

export const getFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  const userResult = user ? JSON.parse(user) : null;
  return userResult;
};

export const clearFromLocalStorage = () => localStorage.removeItem("user");
