import { useState } from "react";

export default function DishDetails({ dish, amount, setCart, id }) {
  const { title, price, image, details } = dish;

  const [dishAmountDishDetails, setDishAmountDishDetails] = useState(
    amount || 1
  );
  const [isInputDirty, setIsInputDirty] = useState(false);

  const handleDishAmountChange = (e) => {
    const noZeroValue = e.target.value ? +e.target.value : "";
    setDishAmountDishDetails(noZeroValue);
    setIsInputDirty(false);
  };

  return (
    <div className="product-box-dish-details">
      <h3 className="product-box__title">{title}</h3>
      <div className="product-box__img">
        <img className="img-fluid" src={image} alt={title} />
      </div>

      <div className="product-box-meta-dish-details">
        <div>Ingridients: {details}</div>
      </div>

      <div className="product-box__meta">
        <p>{price} UAH</p>
        <div className="qty">
          <input
            type="number"
            className="qty__item"
            value={dishAmountDishDetails}
            onChange={handleDishAmountChange}
            min={1}
          />
        </div>

        <button
          className="product-box__btn"
          onClick={(e) => {
            e.stopPropagation();

            // отметка кнопки, стейт, по определению false, при клике становится true
            setIsInputDirty(true);

            // еще меняется стейт корзины, возвращается старый стейт + id и количество блюда, которое добавили
            // , нажав на кнопку
            setCart((prev) => {
              return { ...prev, [id]: dishAmountDishDetails };
            });
          }}
        >
          {/* если на кнопку нажали, она подписывается In Cart, 
          если нет - то Add to Cart */}
          {isInputDirty ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
