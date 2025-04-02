export default function PopUp({ children, isOpen, closePopUp }) {
  // { children} нужен для прорисовки компонента-ребенка, это деструктуризация
  // компонента-ребенка

  // если кнопка заказа нажата, получает статус isOpen, если статус не isOpen,
  // возвращает ничего и, соответсвенно не появляется
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popUp">
      <div className="blur" onClick={closePopUp}></div>
      <div className="popUp_content">
        <button className="close-btn" onClick={closePopUp}>
          x
        </button>
        {children}
      </div>
    </div>
  );
}
