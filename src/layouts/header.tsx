import { NavLink, Outlet } from "react-router-dom";
import { MapPin, ShoppingCart } from "phosphor-react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "./header.scss";

export function Header() {
  const { cartQuantity } = useContext(CartContext);

  return (
    <div>
      <nav>
        <NavLink to={"/"}>
          <img
            className="deliveryLogo"
            src="https://uploaddeimagens.com.br/images/004/020/003/original/Logo.png?1663024311"
            alt=""
          />
        </NavLink>
        <div className="LocationAndCheckout">
          <div className="Location">
            <MapPin color="var(--purple)" weight="fill" size={22} />
            <span>São Paulo, SP</span>
          </div>
          <NavLink to={"/checkout"}>
            <button>
              {cartQuantity >= 1 && <span>{cartQuantity}</span>}
              <ShoppingCart weight="fill" size={30} />
            </button>
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
