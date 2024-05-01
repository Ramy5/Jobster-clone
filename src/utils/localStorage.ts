"use client";

export interface User_TP {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token: string;
}

export const addToLocalStorage = (user: User_TP) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const userResult = user ? JSON.parse(user) : null;
    return userResult;
  }
};

export const clearFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
