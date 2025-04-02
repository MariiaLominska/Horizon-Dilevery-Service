import "./styles/style.css";
import menu from "./data/menu.js";
import React from "react";
import MenuGrid from "./components/MenuGrid.js";
import TopCart from "./components/TopCart.js";
import Cart from "./components/Cart.js";
import TopCartEmpty from "./components/TopCartEmpty.js";
import Header from "./components/Header.js";
import FilterBox from "./components/FilterBox.js";
import Footer from "./components/Footer.js";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrderWrapper from "./components/OrderWrapper.js";

function App() {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [cart, setCart] = useState({});

  // [dishId] - динамическая переменная (в объекте)
  // setCart(
  //   (prev, dishId, dishAmount) => ({ ...prev, [dishId]: dishAmount })

  //   // для массива
  //   // prev.includes(dishId)
  //   //   ? prev.filter((id) => id !== dishId)
  //   //   : [...prev, dishId]
  // );

  function getTotalPrice() {
    // cart это объект, содержит id блюд и их количество, поэтому запускаем Object.entries, потом reduce,
    // получая маленький массив
    return Object.entries(cart).reduce((acc, dish) => {
      // обращаемся к объектам, получаем id блюда (dish[0]) и его количество (dish[1])
      const dishId = dish[0];
      const dishAmount = dish[1];

      // сравниваем id из cart и id из menu, потому что в cart нет стоимость блюда
      const filteredDish = menu.find((dish) => {
        // и получаем те объекты, которые соотвествуют поиску
        return dish.id == dishId;
      });
      // дальше возвращем в аккумуляторе цену блюд
      return acc + filteredDish.price * dishAmount;
    }, 0);
  }

  function getTotalAmount(cart) {
    const dishAmount = Object.values(cart);

    return dishAmount.reduce((acc, amount) => {
      return acc + amount;
    }, 0);
  }

  const [isOpenPopUp, setOpenPopUp] = useState(false);

  const handleOpenPopUp = () => {
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const cartLenght = Object.keys(cart).length;

  return (
    <div className="App ">
      {/* при добавлении товара в корзину прорисовываем TopCart */}
      {cartLenght > 0 && (
        <TopCart
          cart={cart}
          totalPrice={getTotalPrice()}
          totalAmount={getTotalAmount(cart)}
          isOpenPopUp={isOpenPopUp}
          handleClosePopUp={handleClosePopUp}
          handleOpenPopUp={handleOpenPopUp}
        ></TopCart>
      )}
      <TopCartEmpty></TopCartEmpty>
      <Header></Header>

      <Router>
        <FilterBox
          category={category}
          setCategory={setCategory}
          price={price}
          setPrice={setPrice}
        ></FilterBox>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <MenuGrid
                cart={cart}
                menu={menu}
                category={category}
                price={price}
                setCart={setCart}
                isOpen={isOpenPopUp}
                closePopUp={handleClosePopUp}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <Cart cart={cart} setCart={setCart}>
                  {cartLenght > 0 && (
                    <OrderWrapper
                      cart={cart}
                      totalPrice={getTotalPrice()}
                      openPopUp={handleOpenPopUp}
                    />
                  )}
                </Cart>
              </>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
