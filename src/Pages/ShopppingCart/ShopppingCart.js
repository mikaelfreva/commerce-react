import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ShoppingCart.css";

export default function ShopppingCart() {
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleChange = (event, id) => {
    const indexItem = storeState.cart.findIndex((obj) => obj.id === id);
    const objUpdated = {
      ...storeState.cart[indexItem],
      quantity: Number(event.target.value),
    };
    dispatch({
      type: "UPDATEITEM",
      payload: objUpdated
    })
   
  };

  let totalPrice = 0;
  if(storeState.cart.length !== 0){
    for(const item of storeState.cart){
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice
    }
  }

  return (
    <div className="global-container">
      <p className="heading-cart">Votre panier</p>
      <ul className="cart-list">
        {storeState.cart.map((item) => (
          <li key={item.id}>
            <img
             alt="Panier"
              src={process.env.PUBLIC_URL + `/images/${item.img}.jpg`}
             
            />
            <div className="bloc-cart-infos">
              <h4>{item.title}</h4>
              <p>Price: {item.price}€</p>
            </div>
            <div className="bloc-input">
              <label htmlFor="quantityInput">Quantité</label>
              <input
               min="1"
                onChange={(e) => handleChange(e, item.id)}
                type="number"
                id="quantityInput"
                value={item.quantity}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="total-price">Total : {totalPrice.toFixed(2)}</p>
      <button className="btn-cart">Payer</button>
    </div>
  );
}
