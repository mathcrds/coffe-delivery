import "./styles.scss";
import { ShoppingCart, Package, Timer, Coffee } from "phosphor-react";
import { Products } from "./components/Products/Products";
import { productsMock } from "../../mocks/products-mock";

export function Home() {
  return (
    <>
      <div className="wrapper">
        <div className="leftGroup">
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <p>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
          <div className="shortTexts">
            <span>
              <ShoppingCart weight="fill" className="ShoppingCart" />
              Compra simples e segura
            </span>
            <span>
              <Package weight="fill" className="Package" />
              Embalagem mantém o café intacto
            </span>
            <span>
              <Timer weight="fill" className="Timer" />
              Entrega rápida e rastreada
            </span>
            <span>
              <Coffee weight="fill" className="Coffe" />O café chega fresquinho
              até você
            </span>
          </div>
        </div>
        <img
          className="headerCoffeImage"
          src="https://s3-alpha-sig.figma.com/img/731e/f48d/acb13d1b7c718c6f523d5dc02407a226?Expires=1664150400&Signature=hUzXYhJxnvS5a6X-7Fjkk0PuSn8GhK4ntrN0upIq2UWAfCvZAfUjvZWJvB9qP7c3RL0NvX8V1N1eE69uI6ExM66PiAGjEEODbt6Lcl8SYKEIaOEdg02652gdjY8kDWhn0Lw2A1~ql8uteWInNAkSyUdZ~n~MYr2I80mgFimJA6HEm7qcLb3nd8ed1BnCrEDQnv6kh~kmMyAmHwyqg5mpVkyYXWXzFHCdIMMIGVKrs5qgSn68P1EsV~KEGmSic5ju47eE0z9cQl7VDZN9q--JfqDZVIwZimgwOY8Wg6jD2zVum6iK-KgnR1LP~3SC9SG2he7bBhC~SRBrrwkeYiNq9A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt="imagem de um café com grãos ao fundo"
        />
      </div>

      <div className="productsWrapper">
        <h2>Nossos produtos</h2>
        <div className="productsGrid">
          {productsMock.map((product) => (
            <Products
              key={product.productName}
              productImage={product.productImage}
              typeOfProduct={product.typeOfProduct}
              name={product.productName}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
