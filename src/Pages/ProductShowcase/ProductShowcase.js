import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ProductShowcase.css";
import inventory from "../../data/inventory";

export default function ProductShowcase() {
  const [nbMugs, setNbMugs] = useState(1);

  const { id } = useParams();

  console.log(id);

  const productClicked = inventory.findIndex(
   
    (obj) => obj.title.replace(/\s+/g, "").trim() === id,
  );

  const updateMugs = (e) => {
    setNbMugs(Number(e.target.value));
  };

  const addingInfo = useRef();
  let display = true;

  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();

    const itemAdded = {
      ...inventory[productClicked],
      quantity: nbMugs,
    };

    dispatch({
      type: "ADDITEM",
      payload: itemAdded,
    });

    addingInfo.current.innerText = "Ajouté au panier";

    if (display) {
      display = false;
      setTimeout(() => {
        addingInfo.current.innerText = "";
        display = true;
      }, 500);
    }
  };



  return (
    <div className="showcase">
      <div className="container-img-showcase">
        <img
          className="img-showcase"
          src={
            process.env.PUBLIC_URL +
            `/images/${inventory[productClicked].img}.jpg`
          }
          alt=""
        />
      </div>
      <div className="product-infos">
        <h2>{inventory[productClicked].title}</h2>
        <p>Prix: {inventory[productClicked].price}€</p>
        <form onSubmit={addToCart}>
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            id="quanitity"
            value={nbMugs}
            onChange={updateMugs}
          />
          <button>Ajouter au panier</button>
          <span ref={addingInfo} className="adding-info"></span>
        </form>
      </div>
    </div>
  );
}
