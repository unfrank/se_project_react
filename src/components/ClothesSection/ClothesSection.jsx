import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onAddItem, handleCardClick }) {
  return (
    <div className="clothes-section">
      <p className="clothes-section__header">Your Items</p>
      <button className="clothes-section__add-btn" onClick={onAddItem}>
        + Add Item
      </button>
      <ul className="clothes-section___list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
