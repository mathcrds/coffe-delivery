import { CurrencyDollar, MapPin, Timer } from "phosphor-react";
import { useLocation } from "react-router-dom";
import { OrderData, paymentMethods } from "../Checkout";
import "./styles.scss";

interface LocationType {
  state: OrderData;
}

export function Success() {
  const { state } = useLocation() as unknown as LocationType;

  return (
    <>
      <div className="titleText">
        <h1>Uhu! Pedido confirmado</h1>
        <p>Agora é só aguardar que logo o café chegará até você</p>
      </div>
      <div className="leftContent">
        <div className="local">
          <div className="mapPin">
            <MapPin weight="fill" style={{ color: "var(--white)" }} />
          </div>
          <p>
            Entrega em{" "}
            <b>
              {state.rua}, {state.numero}{" "}
            </b>
            <br />
            {state.bairro} - {state.cidade}, {state.uf}
          </p>
        </div>

        <div className="time">
          <div className="timer">
            <Timer weight="fill" style={{ color: "var(--white)" }} />
          </div>
          <p>Previsão de entrega 20 min - 30 min</p>
        </div>

        <div className="payment">
          <div className="currencyDollar">
            <CurrencyDollar weight="fill" style={{ color: "var(--white)" }} />
          </div>
          <p>
            Pagamento na entrega
            <br />
            <b> {paymentMethods[state.formaPagamento].label} </b>
          </p>
        </div>
      </div>
      <img
        className="bodyImage"
        src="https://uploaddeimagens.com.br/images/004/020/015/original/Illustration-removebg-preview.png?1663024688"
        alt=""
      />
    </>
  );
}
