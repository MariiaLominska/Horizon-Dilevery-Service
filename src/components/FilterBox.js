import React from "react";

export default function FilterBox({ category, setCategory, price, setPrice }) {
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="filter-box">
      <div className="select-box">
        <label className="filter-label">Category</label>
        <select
          className="select-control"
          value={category}
          onChange={handleCategory}
        >
          <option value="All">All</option>
          <option value="Breakfast">Breafast</option>
          <option value="Soups">Soups</option>
          <option value="Side dishes">Side dishes</option>
        </select>
      </div>

      <div className="price-select-box">
        <label className="filter-label">Price</label>
        <select className="select-control" value={price} onChange={handlePrice}>
          <option value="All">All</option>
          <option value="To 150 UAH">To 150 UAH</option>
          <option value="To 250 UAH">To 250 UAH</option>
          <option value="To 300 UAH">To 300 UAH</option>
        </select>
      </div>
    </div>
  );
}
