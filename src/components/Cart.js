import React from "react";
import menu from "../data/menu.js";
import MenuCard from "./MenuCard.js";

export default function Cart({ children, cart, setCart }) {
  const filteredMenu = menu.filter((dish) => cart[dish.id]);

  return (
    <div className="menuGridWrapper">
      {Object.keys(cart).length <= 0 && (
        <h2 className="title">
          Your Cart is empty. The products you add will appear here. Bon apetit!{" "}
        </h2>
      )}
      {Object.keys(cart).length >= 1 && <h2 className="title">Your Cart</h2>}
      <div className="grid-box products-box">
        {filteredMenu.map(({ title, price, image, id }) => (
          <MenuCard
            title={title}
            price={price}
            image={image}
            key={id}
            id={id}
            // isCarted - карточка добавлена в карт, у нее будет рисоваться
            // крестик для удаления ее из cart
            isCarted={true}
            setCart={setCart}
            amount={cart[id]}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
