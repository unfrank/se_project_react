const BASE_URL = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
};
export const register = ({ email, password, name, avatar }) => {
  console.log("🟡 Sending /signup request with:", {
    email,
    password,
    name,
    avatar,
  });

  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then((res) => {
      console.log("🟡 Server response status:", res.status);
      return res.json(); // Convert response to JSON
    })
    .then((data) => {
      console.log("✅ Registration API success. Response data:", data);
      return data;
    })
    .catch((err) => {
      console.error("❌ Registration API failed:", err);
      throw err;
    });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data)); // Store user in localStorage
      return data;
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};
