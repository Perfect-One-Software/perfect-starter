interface SubmitButtonProps {
  disabled?: boolean;
}

export const SubmitButton = ({ disabled }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="btn btn-primary mt-3 w-[100px] self-center border-none bg-fuchsia-800 hover:bg-fuchsia-600 disabled:bg-slate-400"
      disabled={disabled}
    >
      Wyślij
    </button>
  );
};
