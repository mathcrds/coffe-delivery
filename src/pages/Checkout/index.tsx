import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from "phosphor-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../../contexts/CartContext";
import { formatMoney } from "../../util/FormatMoney";
import { ProductsCompact } from "../Home/components/ProductsCompact";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import "./styles.scss";
import { PaymentMethod } from "../Home/components/PaymentMethods";
import { useNavigate } from "react-router-dom";

const DELIVERY_PRICE = 3.5;

export const paymentMethods = {
  credit: {
    label: "Cartão de Crédito",
    icon: <CreditCard size={20} style={{ color: "var(--purple)" }} />,
  },
  debit: {
    label: "Cartão de Débito",
    icon: <Bank size={20} style={{ color: "var(--purple)" }} />,
  },
  money: {
    label: "Dinheiro",
    icon: <Money size={20} style={{ color: "var(--purple)" }} />,
  },
};

enum PaymentMethods {
  credit = "credit",
  debit = "debit",
  money = "money",
}

const confirmOrderValidationSchema = zod.object({
  cep: zod.string().min(1).max(8),
  rua: zod.string().min(1).max(100),
  numero: zod.string().min(1).max(10),
  bairro: zod.string().min(1).max(100),
  cidade: zod.string().min(1).max(100),
  uf: zod.string().min(1).max(2),
  formaPagamento: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return {
        message: "Informe um método de pagamento",
      };
    },
  }),
});

export type OrderData = zod.infer<typeof confirmOrderValidationSchema>;

export function Checkout() {
  const { cartItems, cartItemsTotal, cartQuantity, cleanCart } =
    useContext(CartContext);

  enum ErrorsFeedBack {
    REQUIRED_FIELD = "Preencha os campos obrigatórios marcados com (*)",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(confirmOrderValidationSchema) });

  const total = cartItemsTotal + DELIVERY_PRICE;

  const formattedCartItemsTotal = formatMoney(cartItemsTotal);
  const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE);
  const formattedTotal = formatMoney(total);

  const navigate = useNavigate();

  function handleOrderConfirmation(data: any) {
    navigate("/success", { state: data });
    cleanCart();
    console.log(data);
  }

  return (
    <div className="checkoutWrapper">
      <div className="adressAndPayment">
        <h1>Complete seu pedido</h1>
        <div className="adressInfo">
          <div className="adressTitleAndSubtitle">
            <h2>
              <MapPinLine size={22} style={{ color: "var(--yellow-dark)" }} />{" "}
              Endereço de entrega
            </h2>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
          <div className="adressInputsForm">
            <input
              style={{
                border: `1px solid ${
                  errors.cep ? "#F44336" : "var(--base-button)"
                }`,
              }}
              id="cep"
              type="text"
              placeholder="CEP *"
              {...register("cep")}
            />

            <input
              style={{
                border: `1px solid ${
                  errors.rua ? "#F44336" : "var(--base-button)"
                }`,
              }}
              id="rua"
              type="text"
              placeholder="Rua *"
              {...register("rua")}
            />

            <div className="numeroComplemento">
              <input
                style={{
                  border: `1px solid ${
                    errors.numero ? "#F44336" : "var(--base-button)"
                  }`,
                }}
                id="numero"
                type="text"
                placeholder="Número *"
                {...register("numero")}
              />

              <input
                id="complemento"
                type="text"
                placeholder="Complemento"
                {...register("complemento")}
              />
            </div>
            <div className="bairroCidadeComplemento">
              <input
                style={{
                  border: `1px solid ${
                    errors.bairro ? "#F44336" : "var(--base-button)"
                  }`,
                }}
                id="bairro"
                type="text"
                placeholder="Bairro *"
                {...register("bairro")}
              />

              <input
                style={{
                  border: `1px solid ${
                    errors.cidade ? "#F44336" : "var(--base-button)"
                  }`,
                }}
                id="cidade"
                type="text"
                placeholder="Cidade *"
                {...register("cidade")}
              />

              <input
                style={{
                  border: `1px solid ${
                    errors.uf ? "#F44336" : "var(--base-button)"
                  }`,
                }}
                id="uf"
                type="text"
                placeholder="UF *"
                {...register("uf")}
              />
              {errors.uf && (
                <span>
                  {"Preencha os campos obrigatórios marcados com (*)"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="paymentWrapper">
          <div className="paymentTitleAndSubtitle">
            <h1>
              <CurrencyDollar size={22} style={{ color: "var(--purple)" }} />{" "}
              Pagamento
            </h1>
            <p>
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </p>
          </div>

          <div className="paymentOptions">
            <div className="paymentMethods">
              {Object.entries(paymentMethods).map(([key, { label, icon }]) => (
                <PaymentMethod
                  key={label}
                  id={key}
                  icon={icon}
                  label={label}
                  value={key}
                  {...register("formaPagamento")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="finalCheckoutWrapper">
        <h1 className="titleRightWrapper">Cafés selecionados</h1>
        <div className="finalCheckout">
          <div>
            {cartItems.map((item) => (
              <ProductsCompact key={item.name} coffe={item} />
            ))}
          </div>
          <div className="totalPayment">
            <div className="frame1">
              <span>Total de itens</span>
              <span>R$ {formattedCartItemsTotal}</span>
            </div>
            <div className="frame2">
              <span>Entrega</span>
              <span>R$ {formattedDeliveryPrice}</span>
            </div>
            <div className="frame3">
              <h1>Total</h1>
              <h1>R$ {formattedTotal}</h1>
            </div>
            <button
              id="confirm-button"
              disabled={cartQuantity === 0}
              onClick={handleSubmit(handleOrderConfirmation)}
            >
              CONFIRMAR PEDIDO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
