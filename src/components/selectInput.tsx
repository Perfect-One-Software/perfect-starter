import {
  forwardRef,
  type SelectHTMLAttributes,
  type ForwardRefRenderFunction,
} from "react";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  defaultValue?: string;
}
const ForwardedSelectInput: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectInputProps
> = ({ children, defaultValue, ...rest }, ref) => {
  return (
    <select
      ref={ref}
      className="select border-2 border-purple-950 bg-white text-base font-semibold text-black placeholder-slate-500 focus:border-fuchsia-600"
      defaultValue={defaultValue}
      {...rest}
    >
      {children}
    </select>
  );
};

export const SelectInput = forwardRef(ForwardedSelectInput);
