// const baseUrl = "http://localhost:3001";

// export const handleResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Error: ${res.status} ${res.statusText}`);
// };

// export const getItems = () => {
//   return fetch(`${baseUrl}/items`).then(handleResponse);
// };

// export const addItem = (item) => {
//   const token = localStorage.getItem("jwt");
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(item),
//   }).then(handleResponse);
// };

// export const deleteItem = (id) => {
//   const token = localStorage.getItem("jwt");
//   return fetch(`${baseUrl}/items/${id}`, {
//     method: "DELETE",
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   }).then(handleResponse);
// };

// export const updateUserProfile = (token, userData) => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   }).then((res) => {
//     if (!res.ok) {
//       return Promise.reject(`Error: ${res.status} ${res.statusText}`);
//     }
//     return res.json();
//   });
// };

// export const addCardLike = (id, token) => {
//   return fetch(`${baseUrl}/items/${id}/likes`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }).then(handleResponse);
// };

// export const removeCardLike = (id, token) => {
//   return fetch(`${baseUrl}/items/${id}/likes`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }).then(handleResponse);
// };

//!remake!

const baseUrl = "http://localhost:3001";

export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleResponse);
};

export const addItem = (item) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 Fixed capitalization
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
};

export const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // 🔥 Fixed capitalization
    },
  }).then(handleResponse);
};

export const updateUserProfile = (token, userData) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(handleResponse);
};

// ✅ FIXED: Using correct `baseUrl`
export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
};
