import OrderWrapper from "./OrderWrapper.js";
import PopUp from "./PopUp.js";

export default function TopCart({
  cart,
  totalPrice,
  totalAmount,
  handleOpenPopUp,
  handleClosePopUp,
  isOpenPopUp,
}) {
  return (
    <div className="top-cart">
      <div className="top-cart-info-container">
        <span className="top-cart-info__item">
          Items in cart — <span className="red-info">{totalAmount}</span>, total
          price —<span className="red-info">{totalPrice} UAH</span>
        </span>

        <PopUp closePopUp={handleClosePopUp} isOpen={isOpenPopUp}>
          <OrderWrapper
            cart={cart}
            totalPrice={totalPrice}
            openPopUp={handleOpenPopUp}
            closePopUp={handleClosePopUp}
          ></OrderWrapper>
        </PopUp>

        <button className="btn-check" onClick={handleOpenPopUp}>
          Order
        </button>
      </div>
    </div>
  );
}
