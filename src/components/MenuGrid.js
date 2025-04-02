import MenuCard from "./MenuCard.js";
import menu from "../data/menu.js";
import PopUp from "./PopUp.js";
import { useState } from "react";
import DishDetails from "./DishDetails.js";

export default function MenuGrid({ category, price, cart, setCart }) {
  const [activeCard, setActiveCard] = useState(null);

  const handleActiveCard = (id) => {
    setActiveCard(id);
  };

  const handleClosePopUp = () => {
    setActiveCard(false);
  };

  const matchesCategory = (dish, category) => {
    return category === "All" || dish.category === category;
  };

  const matchesPrice = (dish, price) => {
    switch (price) {
      case "All":
        return true;

      case "To 150 UAH":
        return dish.price <= 150;

      case "To 250 UAH":
        return dish.price <= 250;

      case "To 300 UAH":
        return dish.price <= 300;

      default:
        return false;
    }
  };

  // цены по возрастанию, если выбраны все категории, возвращает обратно тот
  // же массив menu
  // [...menu] нужен, чтобы создать копию массива, так как sort перезапи
  // сывает массив, а не делает его копию
  const filteredMenuSortedByPrice =
    category === "All"
      ? menu
      : [...menu].sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });

  const filteredMenu = filteredMenuSortedByPrice.filter(
    (dish) => matchesCategory(dish, category) && matchesPrice(dish, price)
  );

  const activeMenuCard = menu.find((dish) => {
    return dish.id === activeCard;
  });

  return (
    <div className="grid-box products-box">
      <PopUp closePopUp={handleClosePopUp} isOpen={activeCard}>
        <DishDetails
          cart={cart}
          id={activeCard}
          dish={activeMenuCard}
          amount={cart[activeCard]}
          setCart={setCart}
        ></DishDetails>
      </PopUp>
      {filteredMenu.map(({ title, price, image, id }) => (
        <>
          <MenuCard
            title={title}
            price={price}
            image={image}
            key={id}
            id={id}
            setCart={setCart}
            amount={cart[id]}
            handleActiveCard={handleActiveCard}
          />
        </>
      ))}
    </div>
  );
}
