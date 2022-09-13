import { Minus, Plus, Trash } from "phosphor-react";
import { CartContext, CartItem } from "../../../../contexts/CartContext";
import { useContext } from "react";
import "./styles.scss";
import { formatMoney } from "../../../../util/FormatMoney";

interface CoffeCartCardProps {
  coffe: CartItem;
}

export function ProductsCompact({ coffe }: CoffeCartCardProps) {
  const { changeCartItemQuantity, removeCartItem } = useContext(CartContext);

  const totalPrice = coffe.price * coffe.quantity;

  const totalPriceFormatted = formatMoney(coffe.price * coffe.quantity);

  function handleIncrease() {
    changeCartItemQuantity(coffe.name, "increase");
  }

  function handleDecrease() {
    if (coffe.quantity > 1) changeCartItemQuantity(coffe.name, "decrease");
  }

  function handleRemove() {
    removeCartItem(coffe.name);
  }

  return (
    <div className="confirmPaymentItemsWrapper">
      <img src={coffe.productImage} alt="" />
      <div className="itemAddedTitle">
        <h1>{coffe.name}</h1>
        <div className="actionButtons">
          <div className="iconButtonWrapper">
            <Minus
              className="iconIncreaseDecrease"
              weight="bold"
              size={14}
              onClick={handleDecrease}
            />
            <input type="number" value={coffe.quantity} readOnly />
            <Plus
              className="iconIncreaseDecrease"
              weight="bold"
              size={14}
              onClick={handleIncrease}
            />
          </div>
          <button className="removeButton" onClick={handleRemove}>
            <Trash size={16} style={{ color: "var(--purple)" }} />
            REMOVER
          </button>
        </div>
      </div>
      <span>R$ {totalPriceFormatted}</span>
    </div>
  );
}
