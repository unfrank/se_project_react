// const baseUrl = "http://localhost:3001";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.unfrank.crabdance.com"
    : "http://localhost:3001";

import { handleResponse } from "./api";

export const register = (email, password, name, avatar = "") => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
      avatar: avatar || "",
    }),
  }).then(handleResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "D",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};
