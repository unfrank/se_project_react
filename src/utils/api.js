const baseUrl = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`)); // Fixed template literal and added `new` keyword
};

const handleError = (err) => {
  console.error(err);
  return Promise.reject(err);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleResponse).catch(handleError);
};

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

export const deleteItem = (id) => {
  console.log("deleteItem API called with ID:", id);
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log("deleteItem API response status:", res.status);
      return handleResponse(res);
    })
    .catch((err) => {
      console.error("Error during deleteItem API call:", err);
      return Promise.reject(err);
    });
};
