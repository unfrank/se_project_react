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
