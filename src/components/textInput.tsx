import {
  forwardRef,
  type ForwardRefRenderFunction,
  type InputHTMLAttributes,
} from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const ForwardedTextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = ({ placeholder, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      autoComplete="off"
      className="input border-2 border-purple-950 bg-white font-semibold text-black placeholder-slate-500 focus:border-fuchsia-600"
      {...rest}
    />
  );
};

export const TextInput = forwardRef(ForwardedTextInput);
