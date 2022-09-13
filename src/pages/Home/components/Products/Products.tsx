import { Minus, Plus, ShoppingCart } from "phosphor-react";
import { useContext, useState } from "react";
import { CartContext } from "../../../../contexts/CartContext";
import { formatMoney } from "../../../../util/FormatMoney";
import "./Products.scss";

export interface Coffe {
  productImage?: string;
  typeOfProduct: string;
  name: string;
  description: string;
  price: number;
}

export function Products(props: Coffe) {
  const [quantity, setQuantity] = useState(1);

  const { cartItems, addCoffeToCart } = useContext(CartContext);

  const priceFormatted = formatMoney(props.price);

  function handleIncrease() {
    setQuantity((state) => state + 1);
  }

  function handleDecrease() {
    if (quantity > 1) {
      setQuantity((state) => state - 1);
    }
    return quantity;
  }

  function handleAddCoffeToCart() {
    const addToCart = {
      ...props,
      quantity,
    };
    addCoffeToCart(addToCart);
  }

  return (
    <div className="productWrapper">
      <img src={props.productImage} alt="" />
      <span>{props.typeOfProduct}</span>
      <h1>{props.name}</h1>
      <p>{props.description}</p>

      <div className="priceAndCheckout">
        <span>
          <span className="rs">R$:</span>
          <span className="priceText">{priceFormatted}</span>
        </span>

        <div className="iconButtonWrapper">
          <Minus
            className="iconIncreaseDecrease"
            weight="bold"
            size={14}
            onClick={handleDecrease}
          />
          <input type="number" value={quantity} readOnly />
          <Plus
            className="iconIncreaseDecrease"
            weight="bold"
            size={14}
            onClick={handleIncrease}
          />
        </div>

        <button onClick={handleAddCoffeToCart}>
          <ShoppingCart weight="fill" className="ShoppingCart" size={22} />
        </button>
      </div>
    </div>
  );
}
