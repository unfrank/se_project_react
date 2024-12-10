const baseUrl = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(Error: ${res.status});
};

const handleError = (err) => {
  console.error(err);
  return Promise.reject(err);
};

export const getItems = () => {
  return fetch(${baseUrl}/items).then(handleResponse).catch(handleError);
};

export const addItem = (item) => {
  return fetch(${baseUrl}/items, {
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
  return fetch(${baseUrl}/items/${id}, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
};