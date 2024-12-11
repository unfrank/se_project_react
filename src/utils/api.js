// const baseUrl = "http://localhost:3001";

// const handleResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(new Error(`Error: ${res.status}`));
// };

// const handleError = (err) => {
//   console.error(err);
//   return Promise.reject(err);
// };

// export const getItems = () => {
//   return fetch(`${baseUrl}/items`)
//     .then((res) => {
//       console.log("Fetched items:", res);
//       return handleResponse(res);
//     })
//     .catch(handleError);
// };

// export const addItem = (item) => {
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(item),
//   })
//     .then(handleResponse)
//     .catch(handleError);
// };

// export const deleteItem = (id) => {
//   return fetch(`${baseUrl}/items/${id}`, {
//     method: "DELETE",
//   })
//     .then((res) => {
//       return handleResponse(res);
//     })
//     .catch((err) => {
//       console.error("Error during deleteItem API call:", err);
//       return Promise.reject(err);
//     });
// };

const baseUrl = "http://localhost:3001";

/**
 * Handles the API response by checking status and parsing JSON if successful.
 * @param {Response} res - The fetch response object.
 * @returns {Promise} - Parsed JSON or an error.
 */
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
};

/**
 * Logs errors for debugging and rethrows them for further handling.
 * @param {Error} error - The error object.
 * @returns {Promise<never>} - A rejected promise with the error.
 */
const handleError = (error) => {
  console.error("API Error:", error);
  return Promise.reject(error);
};

/**
 * Fetches all items from the server.
 * @returns {Promise<Array>} - A promise resolving to an array of clothing items.
 */
export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleResponse).catch(handleError);
};

/**
 * Adds a new item to the server.
 * @param {Object} item - The item object to add (name, imageUrl, weather).
 * @returns {Promise<Object>} - A promise resolving to the added item.
 */
export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Deletes an item from the server.
 * @param {number|string} id - The ID of the item to delete.
 * @returns {Promise<void>} - A promise resolving when the deletion is successful.
 */
export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
};
