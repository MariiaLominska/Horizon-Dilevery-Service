// import { useState } from "react";
import menu from "../data/menu.js";

export default function OrderWrapper({ cart, totalPrice, openPopUp }) {
  function getCartInfo(cart) {
    return Object.entries(cart).map(([dishId, dishAmount]) => {
      const dish = menu.find((dish) => {
        return dish.id === +dishId;
      });
      return { ...dish, amount: dishAmount };
    });
  }

  const cartInfo = getCartInfo(cart);

  return (
    // два варианта компонента
    <div className="order_wrapper">
      <div className="bill">
        <div className="bill-title-wrapper">
          <h2>Your order</h2>
        </div>
        <div className="billInfo">
          <ul>
            {cartInfo.map(({ title, price, amount }) => {
              return (
                <li>
                  <div className="orderField">
                    <div className="titleField">{title}: </div>
                    <div className="priceField">
                      {amount === 1
                        ? `${price} UAH`
                        : `${amount} * ${price} UAH = ${amount * price} UAH`}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="totalPriceField">
            Total price is: {totalPrice} UAH
          </div>
        </div>
        <button className="btn-check" onClick={openPopUp}>
          Make an Order
        </button>
      </div>
    </div>
  );
}
