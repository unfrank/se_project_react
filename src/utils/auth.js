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
  }); // 🔥 Step 1 Debug

  console.log("🔍 Debug: register function:", register);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then((res) => {
      console.log("🟡 Server response status:", res.status); // 🔥 Step 2 Debug
      return handleResponse(res);
    })
    .then((data) => {
      console.log("✅ Registration API success. Response data:", data); // 🔥 Step 3 Debug
      return data;
    })
    .catch((err) => {
      console.error("❌ Registration API failed:", err); // 🔥 Step 4 Debug
      throw err;
    });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
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
