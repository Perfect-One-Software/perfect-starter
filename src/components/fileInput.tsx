import {
  forwardRef,
  type ForwardRefRenderFunction,
  type InputHTMLAttributes,
} from "react";

type FileInputProps = InputHTMLAttributes<HTMLInputElement>;

const ForwardedFileInput: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = ({ ...rest }, ref) => {
  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      className="file-input border-2 border-purple-950 bg-white text-base font-semibold text-black placeholder-slate-500 focus:border-fuchsia-600"
      multiple={false}
      {...rest}
    />
  );
};

export const FileInput = forwardRef(ForwardedFileInput);
