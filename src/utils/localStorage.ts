export const addToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  const userResult = user ? JSON.parse(user) : null;
  return userResult;
};

export const clearFromLocalStorage = () => {
  localStorage.removeItem("user");
};
