// import "./ClothesSection.css";
// import ItemCard from "../ItemCard/ItemCard";

// function ClothesSection({ clothingItems, onAddItem, handleCardClick }) {
//   return (
//     <div className="clothes-section">
//       <div className="clothes-section__header">
//         <p className="clothes-section__title">Your Items</p>

//         <button
//           onClick={() => {
//             if (typeof onAddItem === "function") {
//               onAddItem();
//             } else {
//               console.error("❌ `onAddItem` is not a function!");
//             }
//           }}
//           type="button"
//           className="clothes-section__add-btn"
//         >
//           + Add New
//         </button>

//         {/* <button className="clothes-section__add-btn" onClick={onAddItem}>
//           + Add New
//         </button> */}
//       </div>
//       <ul className="clothes-section__list">
//         {clothingItems.map((item) => (
//           <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ClothesSection;

//! remake
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onAddItem, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>

        <button
          onClick={() => {
            console.log("🟡 `+ Add New` button clicked!");
            if (typeof onAddItem === "function") {
              onAddItem(); // ✅ Calls the same function as Header
            } else {
              console.error("❌ `onAddItem` is not a function!");
            }
          }}
          type="button"
          className="clothes-section__add-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
