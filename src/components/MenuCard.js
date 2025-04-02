import { useState } from "react";

export default function MenuCard({
  title,
  price,
  image,
  setCart,
  id,
  amount,
  isCarted,
  // передаем пустую функцию, чтобы она передавалась, но ничего не происходило
  handleActiveCard = () => {},
}) {
  const [dishAmount, setDishAmount] = useState(amount || 1);
  const [isInputDirty, setIsInputDirty] = useState(false);

  const handleDishAmountChange = (e) => {
    const noZeroValue = e.target.value ? +e.target.value : "";
    setDishAmount(noZeroValue);
    setIsInputDirty(false);
  };

  function deleteFromCart() {
    // нельзя напрямую менять стейт, его нужно деструктуризировать,
    // создавая его копию, и уже оттуда удаляя товар по его id
    setCart((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }

  return (
    <div className="product-box__item" onClick={() => handleActiveCard(id)}>
      {/* если карточка добавлена в cart, рисуем крестик */}
      <h3 className="product-box__title">{title}</h3>
      {isCarted && (
        <button className="close-btn-carted-item" onClick={deleteFromCart}>
          х
        </button>
      )}
      <div className="product-box__img">
        <img className="img-fluid" src={image} alt={title} />
      </div>
      <div className="product-box-price">
        <p>{price} UAH</p>
      </div>
      <div className="product-box__meta">
        <div className="qty">
          <input
            // предотвращает передачу информации об ивенте родителям, ивент
            //  не срабатывает
            onClick={(e) => {
              e.stopPropagation();
            }}
            type="number"
            className="qty__item"
            value={dishAmount}
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
              return { ...prev, [id]: dishAmount };
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
