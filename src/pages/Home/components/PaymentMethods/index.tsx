import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import "./styles.scss";

type PaymentMethodInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
  label: string;
};

export const PaymentMethod = forwardRef<
  HTMLInputElement,
  PaymentMethodInputProps
>(({ id, icon, label, ...props }, ref) => {
  return (
    <div className="payment-method-wrapper">
      <input id={id} type="radio" {...props} name="formaPagamento" ref={ref} />
      <label htmlFor={id} id="label-wrapper">
        {icon}
        {label}
      </label>
    </div>
  );
});
