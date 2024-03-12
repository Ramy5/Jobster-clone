"use client";

export const addToLocalStorage = (user) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};

export const getFromLocalStorage = () => {
  const user = window.localStorage.getItem("user");
  const userResult = user ? JSON.parse(user) : null;
  return userResult;
};

export const clearFromLocalStorage = () => {
  window.localStorage.removeItem("user");
};
