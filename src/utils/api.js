export const addClothingItem = (item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!item.name || !item.imageUrl || !item.weather) {
        reject("Missing required fields");
      } else {
        resolve({
          ...item,
          _id: Date.now().toString(),
        });
      }
    }, 500);
  });
};

export const deleteClothingItem = (item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!item) {
        reject("Item not found");
      } else {
        resolve(`Item ${item.name} deleted`);
      }
    }, 500);
  });
};
