import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import "./global.scss";
import { CartContextProvider } from "./contexts/CartContext";

export function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Router />
      </CartContextProvider>
    </BrowserRouter>
  );
}
